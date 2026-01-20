import { Injectable, signal, effect, inject } from '@angular/core';
import { ToastService } from '../../../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private toastService = inject(ToastService);

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
