import { Component, inject, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart-store';

@Component({
  selector: 'app-cart-drawer',
  imports: [CommonModule, RouterLink, NgOptimizedImage],
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
                      <h2 class="text-xl font-medium font-display text-primary-900" id="slide-over-title">
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
                            <li class="py-12 text-center flex flex-col items-center">
                              <svg class="h-10 w-10 text-primary-200 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                              <p class="text-primary-500 font-light">Your cart is empty</p>
                            </li>
                          }
                          @for (item of cartItems(); track item.product.id; let first = $first) {
                            <li class="flex py-6">
                              <div
                                class="relative h-24 w-24 flex-shrink-0 overflow-hidden border border-primary-100 bg-secondary-50"
                              >
                                <img
                                  [ngSrc]="item.product.imageUrl"
                                  [alt]="item.product.name"
                                  fill
                                  [priority]="first"
                                  class="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div
                                    class="flex justify-between text-base font-medium text-primary-900"
                                  >
                                    <h3>
                                      <a
                                        [routerLink]="['/product', item.product.id]"
                                        (click)="close()"
                                        class="font-display hover:text-primary-600 transition-colors"
                                      >
                                        {{ item.product.name }}
                                      </a>
                                    </h3>
                                    <p class="ml-4 font-light">{{ item.product.price | currency }}</p>
                                  </div>
                                  <p class="mt-1 text-sm text-primary-500 font-light">
                                    {{ item.product.category }}
                                    @if (item.variant) {
                                      <span class="ml-2 text-xs text-primary-400"
                                        >Variant: {{ item.variant }}</span
                                      >
                                    }
                                  </p>
                                </div>
                                <div class="flex flex-1 items-end justify-between text-sm">
                                  <p class="text-primary-500 font-light">Qty {{ item.quantity }}</p>

                                  <div class="flex">
                                    <button
                                      type="button"
                                      (click)="removeItem(item.product.id, item.variant)"
                                      class="font-medium text-primary-900 hover:text-accent-600 transition-colors text-xs uppercase tracking-widest"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
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
                      <div class="flex items-center justify-center space-x-8 text-primary-400">
                        <div class="flex flex-col items-center gap-1">
                          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          <span class="text-[10px] uppercase tracking-widest">Secure</span>
                        </div>
                        <div class="flex flex-col items-center gap-1">
                          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          <span class="text-[10px] uppercase tracking-widest">Free Ship</span>
                        </div>
                        <div class="flex flex-col items-center gap-1">
                          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span class="text-[10px] uppercase tracking-widest">Returns</span>
                        </div>
                      </div>
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
