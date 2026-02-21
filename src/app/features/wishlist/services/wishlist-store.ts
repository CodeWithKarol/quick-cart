import { Injectable, signal, effect, inject, computed } from '@angular/core';
import { ToastService } from '../../../shared/services/toast-service';
import { ProductService } from '../../products/services/product-api';
import { take } from 'rxjs/operators';

export interface WishlistItem {
  productId: number;
  variant?: string; // e.g., 'Midnight Blue'
  collection: string; // Defaults to 'All'
}

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private toastService = inject(ToastService);
  private productService = inject(ProductService);

  readonly wishlist = signal<WishlistItem[]>([]);
  readonly collections = computed(() => {
    const defaultCollections = ['All', 'Favorites', 'Mood Board'];
    const custom = this.wishlist()
      .map((item) => item.collection)
      .filter((c) => !defaultCollections.includes(c));
    return [...new Set([...defaultCollections, ...custom])];
  });

  constructor() {
    this.loadWishlist();

    // Auto-save whenever signal changes
    effect(() => {
      if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
        localStorage.setItem('wishlist_v2', JSON.stringify(this.wishlist()));
      }
    });

    // Validate wishlist against available products
    this.productService
      .getProducts()
      .pipe(take(1))
      .subscribe((products) => {
        const activeProductIds = new Set(products.map((p) => p.id));
        this.wishlist.update((currentItems) =>
          currentItems.filter((item) => activeProductIds.has(item.productId)),
        );
      });
  }

  private loadWishlist() {
    if (typeof localStorage === 'undefined' || typeof localStorage.getItem !== 'function') return;

    // Try new v2 storage first
    const savedV2 = localStorage.getItem('wishlist_v2');
    if (savedV2) {
      try {
        this.wishlist.set(JSON.parse(savedV2));
        return;
      } catch (e) {
        console.error('Failed to parse wishlist v2', e);
      }
    }

    // Fallback/Migration for v1 (legacy number[])
    const savedV1 = localStorage.getItem('wishlist');
    if (savedV1) {
      try {
        const parsedIds: number[] = JSON.parse(savedV1);
        const migrated: WishlistItem[] = parsedIds.map((id) => ({
          productId: id,
          collection: 'All',
        }));
        this.wishlist.set(migrated);
        // Clear v1 to avoid repeat migration
        localStorage.removeItem('wishlist');
      } catch (e) {
        console.error('Failed to migrate wishlist v1', e);
      }
    }
  }

  toggle(productId: number, variant?: string, collection = 'All') {
    this.wishlist.update((current) => {
      const exists = current.find(
        (item) =>
          item.productId === productId &&
          item.variant === variant &&
          item.collection === collection,
      );

      if (exists) {
        this.toastService.info('Removed from wishlist');
        return current.filter((item) => item !== exists);
      } else {
        this.toastService.success('Added to wishlist');
        return [...current, { productId, variant, collection }];
      }
    });
  }

  add(productId: number, variant?: string, collection = 'All') {
    this.wishlist.update((current) => {
      const exists = current.find(
        (item) =>
          item.productId === productId &&
          item.variant === variant &&
          item.collection === collection,
      );
      if (exists) return current;

      this.toastService.success('Added to wishlist');
      return [...current, { productId, variant, collection }];
    });
  }

  moveToCollection(productId: number, oldCollection: string, newCollection: string) {
    this.wishlist.update((current) =>
      current.map((item) =>
        item.productId === productId && item.collection === oldCollection
          ? { ...item, collection: newCollection }
          : item,
      ),
    );
    this.toastService.success(`Moved to ${newCollection}`);
  }

  isInWishlist(productId: number, variant?: string) {
    return this.wishlist().some((item) => item.productId === productId && item.variant === variant);
  }
}
