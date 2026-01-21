import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-delivery',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout-delivery.component.html',
  styleUrl: './checkout-delivery.component.css',
})
export class CheckoutDeliveryComponent {
  deliveryMethod = input.required<'standard' | 'express'>();
  deliveryMethodChange = output<'standard' | 'express'>();
  continue = output<void>();
  back = output<void>();
}
