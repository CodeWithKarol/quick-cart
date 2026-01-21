import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-store';
import { EmptyCartComponent } from '../../components/empty-cart/empty-cart.component';
import { CartItemComponent } from '../../components/cart-item/cart-item-card';
import { CartOrderSummaryComponent } from '../../components/cart-order-summary/cart-order-summary.component';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, EmptyCartComponent, CartItemComponent, CartOrderSummaryComponent],
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
    `,
  ],
  template: `
    <div class="bg-white flex-1 flex flex-col">
      <div
        class="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8 flex-1 flex flex-col w-full"
      >
        <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

        @if (cartItems().length === 0) {
          <app-empty-cart />
        } @else {
          <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" class="lg:col-span-7">
              <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

              <ul role="list" class="divide-y divide-gray-200 border-t border-b border-gray-200">
                @for (item of cartItems(); track item.product.id; let first = $first) {
                  <li class="flex py-6 sm:py-10">
                    <app-cart-item
                      class="flex w-full"
                      [item]="item"
                      [priority]="first"
                      (quantityUpdate)="updateQuantity(item.product.id, $event)"
                      (remove)="removeItem(item.product.id)"
                    ></app-cart-item>
                  </li>
                }
              </ul>
            </section>

            <!-- Order summary -->
            <app-cart-order-summary [subtotal]="cartTotal()" class="lg:col-span-5 lg:mt-0" />
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartPage {
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
