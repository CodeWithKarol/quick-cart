import { Component, input, output, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartItem } from '../../../cart/models/cart-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checkout-order-summary',
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout-order-summary.component.html',
  styleUrl: './checkout-order-summary.component.css',
})
export class CheckoutOrderSummaryComponent {
  cartItems = input.required<CartItem[]>();
  cartTotal = input.required<number>();
  shippingCost = input.required<number>();
  discount = input<number>(0);
  total = input.required<number>();
  deliveryDates = input<string>('');
  appliedPromo = input<string | null>(null);
  promoError = input<string | null>(null);

  applyPromoCode = output<string>();
  isMobileOpen = signal(false);

  toggleMobile() {
    this.isMobileOpen.update((v) => !v);
  }
}
