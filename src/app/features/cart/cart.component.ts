import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

        @if (cartItems().length === 0) {
        <div class="mt-12 text-center">
          <svg
            class="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <h3 class="mt-2 text-sm font-semibold text-gray-900">Your cart is empty</h3>
          <p class="mt-1 text-sm text-gray-500">Start adding some items to your cart!</p>
          <div class="mt-6">
            <a
              routerLink="/"
              class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Start Shopping
            </a>
          </div>
        </div>
        } @else {
        <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section aria-labelledby="cart-heading" class="lg:col-span-7">
            <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

            <ul role="list" class="divide-y divide-gray-200 border-t border-b border-gray-200">
              @for (item of cartItems(); track item.product.id) {
              <li class="flex py-6 sm:py-10">
                <div class="flex-shrink-0">
                  <div
                    class="relative h-24 w-24 rounded-md border border-gray-200 overflow-hidden sm:h-48 sm:w-48"
                  >
                    <img
                      [ngSrc]="item.product.imageUrl"
                      [alt]="item.product.name"
                      fill
                      class="h-full w-full object-cover object-center"
                    />
                  </div>
                </div>

                <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div class="flex justify-between">
                        <h3 class="text-sm">
                          <a
                            [routerLink]="[]"
                            class="font-medium text-gray-700 hover:text-gray-800"
                          >
                            {{ item.product.name }}
                          </a>
                        </h3>
                      </div>
                      <div class="mt-1 flex text-sm">
                        <p class="text-gray-500">{{ item.product.category }}</p>
                      </div>
                      <p class="mt-1 text-sm font-medium text-gray-900">
                        {{ item.product.price | currency }}
                      </p>
                    </div>

                    <div class="mt-4 sm:mt-0 sm:pr-9">
                      <label [for]="'quantity-' + item.product.id" class="sr-only"
                        >Quantity, {{ item.product.name }}</label
                      >
                      <div class="flex items-center border border-gray-300 rounded-md w-32">
                        <button
                          type="button"
                          (click)="updateQuantity(item.product.id, item.quantity - 1)"
                          [disabled]="item.quantity <= 1"
                          class="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span class="sr-only">Decrease quantity</span>
                          <svg
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M20 12H4"
                            />
                          </svg>
                        </button>
                        <input
                          [id]="'quantity-' + item.product.id"
                          type="text"
                          readonly
                          [value]="item.quantity"
                          class="w-full text-center border-none p-0 text-gray-900 focus:ring-0 sm:text-sm"
                        />
                        <button
                          type="button"
                          (click)="updateQuantity(item.product.id, item.quantity + 1)"
                          class="p-2 text-gray-600 hover:text-gray-900"
                        >
                          <span class="sr-only">Increase quantity</span>
                          <svg
                            class="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 4v16m8-8H4"
                            />
                          </svg>
                        </button>
                      </div>

                      <div class="absolute top-0 right-0">
                        <button
                          type="button"
                          (click)="removeItem(item.product.id)"
                          class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                        >
                          <span class="sr-only">Remove</span>
                          <svg
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>

                  <p class="mt-4 flex space-x-2 text-sm text-gray-700">
                    <svg
                      class="h-5 w-5 flex-shrink-0 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>In stock</span>
                  </p>
                </div>
              </li>
              }
            </ul>
          </section>

          <!-- Order summary -->
          <section
            aria-labelledby="summary-heading"
            class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
          >
            <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

            <dl class="mt-6 space-y-4">
              <div class="flex items-center justify-between">
                <dt class="text-sm text-gray-600">Subtotal</dt>
                <dd class="text-sm font-medium text-gray-900">{{ cartTotal() | currency }}</dd>
              </div>
              <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt class="flex items-center text-sm text-gray-600">
                  <span>Shipping estimate</span>
                  <a href="#" class="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Learn more about how shipping is calculated</span>
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </dt>
                <dd class="text-sm font-medium text-gray-900">$5.00</dd>
              </div>
              <div class="flex items-center justify-between border-t border-gray-200 pt-4">
                <dt class="text-base font-medium text-gray-900">Order total</dt>
                <dd class="text-base font-medium text-gray-900">
                  {{ cartTotal() + 5 | currency }}
                </dd>
              </div>
            </dl>

            <div class="mt-6">
              <button
                routerLink="/checkout"
                class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Checkout
              </button>
            </div>
          </section>
        </div>
        }
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
  cartCount = this.cartService.cartCount;
  cartTotal = this.cartService.cartTotal;

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
