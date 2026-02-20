import { Component, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-store';
import { CartDrawerItemComponent } from './cart-drawer-item.component';
import { CartDrawerEmptyComponent } from './cart-drawer-empty.component';
import { CartDrawerTrustBadgesComponent } from './cart-drawer-trust-badges.component';

@Component({
  selector: 'app-cart-drawer',
  imports: [
    CommonModule,
    RouterLink,
    CartDrawerItemComponent,
    CartDrawerEmptyComponent,
    CartDrawerTrustBadgesComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (isOpen()) {
      <div class="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <!-- Background backdrop -->
        <div
          class="fixed inset-0 bg-primary-950/40 backdrop-blur-sm transition-opacity"
          (click)="close()"
          (keyup.enter)="close()"
          tabindex="0"
        ></div>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col bg-white shadow-xl">
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <h2
                        class="text-xl font-medium font-display text-primary-900"
                        id="slide-over-title"
                      >
                        Shopping cart
                      </h2>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative -m-2 p-2 text-primary-400 hover:text-primary-500"
                          (click)="close()"
                        >
                          <span class="absolute -inset-0.5"></span>
                          <span class="sr-only">Close panel</span>
                          <svg
                            class="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div class="mt-8">
                      <div class="flow-root">
                        <ul role="list" class="-my-6 divide-y divide-primary-100">
                          @if (cartItems().length === 0) {
                            <app-cart-drawer-empty />
                          }
                          @for (item of cartItems(); track item.product.id; let first = $first) {
                            <app-cart-drawer-item
                              [item]="item"
                              [priority]="first"
                              (remove)="removeItem(item.product.id, item.variant)"
                              (navigate)="close()"
                            />
                          }
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div class="border-t border-primary-100 px-4 py-6 sm:px-6 bg-secondary-50/30">
                    <div class="flex justify-between text-base font-medium text-primary-900">
                      <p class="font-display">Subtotal</p>
                      <p class="font-display">{{ cartTotal() | currency }}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-primary-500 font-light">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div class="mt-6">
                      <button
                        type="button"
                        routerLink="/checkout"
                        (click)="close()"
                        [disabled]="cartItems().length === 0"
                        class="w-full flex items-center justify-center border border-transparent bg-primary-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest transition-colors"
                      >
                        Checkout
                      </button>
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm text-primary-500">
                      <p>
                        or
                        <button
                          type="button"
                          class="font-medium text-primary-900 hover:text-primary-700 uppercase tracking-widest text-xs"
                          (click)="close()"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>

                    <!-- Trust Badges -->
                    <div class="mt-8 border-t border-primary-100 pt-6">
                      <app-cart-drawer-trust-badges />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class CartDrawerComponent {
  private cartService = inject(CartService);

  isOpen = this.cartService.isDrawerOpen;
  cartItems = this.cartService.cartItems;
  cartTotal = this.cartService.cartTotal;

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  close() {
    this.cartService.closeDrawer();
  }

  removeItem(id: number, variant?: string) {
    this.cartService.removeFromCart(id, variant);
  }
}
