import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Signal to hold the list of cart items
  private cartItemsSignal = signal<CartItem[]>([]);

  // Computed signal for the total number of items
  readonly cartCount = computed(() =>
    this.cartItemsSignal().reduce((acc, item) => acc + item.quantity, 0)
  );

  // Computed signal for the total price
  readonly cartTotal = computed(() =>
    this.cartItemsSignal().reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  );

  // Expose the cart items as a readonly signal
  readonly cartItems = this.cartItemsSignal.asReadonly();

  addToCart(product: Product): void {
    this.cartItemsSignal.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...items, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number): void {
    this.cartItemsSignal.update((items) => items.filter((item) => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItemsSignal.update((items) =>
      items.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  }

  clearCart(): void {
    this.cartItemsSignal.set([]);
  }
}
