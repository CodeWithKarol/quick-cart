import { Injectable, signal, computed, inject } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Product } from '../../products/models/product';
import { ToastService } from '../../../shared/services/toast.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private toastService = inject(ToastService);

  // Signal to hold the list of cart items
  private cartItemsSignal = signal<CartItem[]>([]);

  // Computed signal for the total number of items
  readonly cartCount = computed(() =>
    this.cartItemsSignal().reduce((acc, item) => acc + item.quantity, 0),
  );

  // Computed signal for the total price
  readonly cartTotal = computed(() =>
    this.cartItemsSignal().reduce((acc, item) => acc + item.product.price * item.quantity, 0),
  );

  // Expose the cartItems signal as readonly
  readonly cartItems = this.cartItemsSignal.asReadonly();

  // Drawer state
  readonly isDrawerOpen = signal(false);

  toggleDrawer() {
    this.isDrawerOpen.update((v) => !v);
  }

  openDrawer() {
    this.isDrawerOpen.set(true);
  }

  closeDrawer() {
    this.isDrawerOpen.set(false);
  }

  clearCart() {
    this.cartItemsSignal.set([]);
  }

  addToCart(product: Product) {
    this.cartItemsSignal.update((items) => {
      // ... logic
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        this.toastService.show(`Updated quantity for ${product.name}`);
        this.openDrawer(); // Auto open drawer on add
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      this.toastService.show(`${product.name} added to cart`);
      this.openDrawer(); // Auto open drawer on add
      return [...items, { product, quantity: 1 }];
    });
  }

  removeFromCart(productId: number) {
    this.cartItemsSignal.update((items) => items.filter((item) => item.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItemsSignal.update((items) =>
      items.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    );
  }
}
