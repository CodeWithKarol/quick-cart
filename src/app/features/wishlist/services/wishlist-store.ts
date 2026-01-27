import { Injectable, signal, effect, inject } from '@angular/core';
import { ToastService } from '../../../shared/services/toast-service';
import { ProductService } from '../../products/services/product-api';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private toastService = inject(ToastService);
  private productService = inject(ProductService);

  readonly wishlist = signal<number[]>([]);

  constructor() {
    this.loadWishlist();

    // Auto-save whenever signal changes
    effect(() => {
      if (typeof localStorage !== 'undefined' && typeof localStorage.setItem === 'function') {
        localStorage.setItem('wishlist', JSON.stringify(this.wishlist()));
      }
    });

    // Validate wishlist against available products to remove stale items
    this.productService
      .getProducts()
      .pipe(take(1))
      .subscribe((products) => {
        const activeProductIds = new Set(products.map((p) => p.id));
        this.wishlist.update((currentIds) => {
          // Filter out IDs that don't exist in the product catalog
          const validIds = currentIds.filter((id) => activeProductIds.has(id));
          return validIds;
        });
      });
  }

  private loadWishlist() {
    if (typeof localStorage === 'undefined' || typeof localStorage.getItem !== 'function') return;

    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        const parsedIds: number[] = JSON.parse(saved);
        // Remove duplicates on load
        this.wishlist.set([...new Set(parsedIds)]);
      } catch (e) {
        console.error('Failed to parse wishlist', e);
      }
    }
  }

  toggle(productId: number) {
    this.wishlist.update((current) => {
      if (current.includes(productId)) {
        this.toastService.show('Removed from wishlist', 'info');
        return current.filter((id) => id !== productId);
      } else {
        this.toastService.show('Added to wishlist', 'success');
        return [...current, productId];
      }
    });
  }

  isInWishlist(productId: number) {
    return this.wishlist().includes(productId);
  }
}
