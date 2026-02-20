import { Component, input, output, ChangeDetectionStrategy, signal } from '@angular/core';
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

  showAddressSuggestions = signal(false);
  addressSuggestions = [
    { street: '123 Market St', city: 'San Francisco', zip: '94105' },
    { street: '456 Castro St', city: 'San Francisco', zip: '94114' },
    { street: '789 Mission St', city: 'San Francisco', zip: '94103' },
    { street: '101 California St', city: 'San Francisco', zip: '94111' },
  ];

  selectAddress(suggestion: { street: string; city: string; zip: string }) {
    this.form().patchValue({
      address: suggestion.street,
      city: suggestion.city,
      zipCode: suggestion.zip,
    });
    this.showAddressSuggestions.set(false);
  }

  hideSuggestionsWithDelay() {
    // Small delay to allow selectAddress to trigger before the list is removed from DOM
    setTimeout(() => this.showAddressSuggestions.set(false), 200);
  }
}
