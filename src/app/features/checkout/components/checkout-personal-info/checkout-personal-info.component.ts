import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout-personal-info',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './checkout-personal-info.component.html',
  styleUrl: './checkout-personal-info.component.css',
})
export class CheckoutPersonalInfoComponent {
  form = input.required<FormGroup>();
  fillMockData = output<void>();
  continue = output<void>();
}
