import { Injectable, signal, effect } from '@angular/core';
import { Product } from '../../products/models/product';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  readonly wishlist = signal<number[]>([]);

  constructor() {
    this.loadWishlist();

    // Auto-save whenever signal changes
    effect(() => {
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist()));
    });
  }

  private loadWishlist() {
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        this.wishlist.set(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse wishlist', e);
      }
    }
  }

  toggle(productId: number) {
    this.wishlist.update((current) => {
      if (current.includes(productId)) {
        return current.filter((id) => id !== productId);
      } else {
        return [...current, productId];
      }
    });
  }

  isInWishlist(productId: number) {
    return this.wishlist().includes(productId);
  }
}
