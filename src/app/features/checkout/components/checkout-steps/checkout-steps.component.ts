import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-steps',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout-steps.component.html',
  styleUrl: './checkout-steps.component.css',
})
export class CheckoutStepsComponent {
  steps = input.required<readonly string[]>(); // Or specific type
  currentStep = input.required<string>();
  stepClick = output<string>();
}
