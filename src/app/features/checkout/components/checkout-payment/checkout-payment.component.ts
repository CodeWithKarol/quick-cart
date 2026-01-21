import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-payment',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout-payment.component.html',
  styleUrl: './checkout-payment.component.css',
})
export class CheckoutPaymentComponent {
  form = input.required<FormGroup>();
  billingSameAsShipping = input.required<boolean>();
  total = input.required<number>();
  isProcessing = input.required<boolean>();

  billingSameAsShippingChange = output<boolean>();
  back = output<void>();
}
