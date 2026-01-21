import { Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../features/cart/services/cart-service';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    @if (isOpen()) {
      <div class="relative z-50" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
        <!-- Background backdrop -->
        <div
          class="fixed inset-0 bg-gray-500/75 transition-opacity"
          (click)="close()"
          (keyup.enter)="close()"
          tabindex="0"
        ></div>

        <div class="fixed inset-0 overflow-hidden">
          <div class="absolute inset-0 overflow-hidden">
            <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <div class="pointer-events-auto w-screen max-w-md">
                <div class="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                    <div class="flex items-start justify-between">
                      <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">
                        Shopping cart
                      </h2>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
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
                        <ul role="list" class="-my-6 divide-y divide-gray-200">
                          @if (cartItems().length === 0) {
                            <li class="py-6 text-center text-gray-500">Your cart is empty</li>
                          }
                          @for (item of cartItems(); track item.product.id) {
                            <li class="flex py-6">
                              <div
                                class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200"
                              >
                                <img
                                  [ngSrc]="item.product.imageUrl"
                                  [alt]="item.product.name"
                                  width="96"
                                  height="96"
                                  class="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div class="ml-4 flex flex-1 flex-col">
                                <div>
                                  <div
                                    class="flex justify-between text-base font-medium text-gray-900"
                                  >
                                    <h3>
                                      <a
                                        [routerLink]="['/product', item.product.id]"
                                        (click)="close()"
                                      >
                                        {{ item.product.name }}
                                      </a>
                                    </h3>
                                    <p class="ml-4">{{ item.product.price | currency }}</p>
                                  </div>
                                  <p class="mt-1 text-sm text-gray-500">
                                    {{ item.product.category }}
                                    @if (item.variant) {
                                      <span class="ml-2 text-xs text-gray-500"
                                        >Variant: {{ item.variant }}</span
                                      >
                                    }
                                  </p>
                                </div>
                                <div class="flex flex-1 items-end justify-between text-sm">
                                  <p class="text-gray-500">Qty {{ item.quantity }}</p>

                                  <div class="flex">
                                    <button
                                      type="button"
                                      (click)="removeItem(item.product.id, item.variant)"
                                      class="font-medium text-indigo-600 hover:text-indigo-500"
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

                  <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div class="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>{{ cartTotal() | currency }}</p>
                    </div>
                    <p class="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div class="mt-6">
                      <a
                        routerLink="/checkout"
                        (click)="close()"
                        class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Checkout
                      </a>
                    </div>
                    <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or
                        <button
                          type="button"
                          class="font-medium text-indigo-600 hover:text-indigo-500"
                          (click)="close()"
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>

                    <!-- Trust Badges -->
                    <div class="mt-8 border-t border-gray-100 pt-6">
                      <div class="flex items-center justify-center space-x-6 text-gray-400">
                        <div class="flex flex-col items-center">
                          <svg
                            class="h-6 w-6 mb-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                          <span class="text-xs">Secure</span>
                        </div>
                        <div class="flex flex-col items-center">
                          <svg
                            class="h-6 w-6 mb-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                          <span class="text-xs">Free Ship</span>
                        </div>
                        <div class="flex flex-col items-center">
                          <svg
                            class="h-6 w-6 mb-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="1.5"
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                          </svg>
                          <span class="text-xs">Returns</span>
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

  close() {
    this.cartService.closeDrawer();
  }

  removeItem(id: number, variant?: string) {
    this.cartService.removeFromCart(id, variant);
  }
}
