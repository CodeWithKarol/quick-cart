import { Component, input, ChangeDetectionStrategy } from '@angular/core';
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
  total = input.required<number>();
}
