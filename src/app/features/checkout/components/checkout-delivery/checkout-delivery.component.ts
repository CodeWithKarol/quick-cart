import { Component, input, output, ChangeDetectionStrategy, computed } from '@angular/core';
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

  standardDeliveryDate = computed(() => {
    const d = new Date();
    d.setDate(d.getDate() + 5);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
  });

  expressDeliveryDate = computed(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', weekday: 'short' });
  });
}
