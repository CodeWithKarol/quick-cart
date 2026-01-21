import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout-delivery',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <div>
        <h3 class="text-lg font-medium text-gray-900">Delivery method</h3>
        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <!-- Standard -->
          <div
            class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
            [class.border-indigo-500]="deliveryMethod() === 'standard'"
            [class.ring-2]="deliveryMethod() === 'standard'"
            [class.ring-indigo-500]="deliveryMethod() === 'standard'"
            [class.border-gray-300]="deliveryMethod() !== 'standard'"
            (click)="deliveryMethodChange.emit('standard')"
          >
            <span class="flex flex-1">
              <span class="flex flex-col">
                <span class="block text-sm font-medium text-gray-900">Standard</span>
                <span class="mt-1 flex items-center text-sm text-gray-500">4–10 business days</span>
                <span class="mt-6 text-sm font-medium text-gray-900">$5.00</span>
              </span>
            </span>
            @if (deliveryMethod() === 'standard') {
              <svg
                class="h-5 w-5 text-indigo-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd"
                />
              </svg>
            }
            <span
              class="pointer-events-none absolute -inset-px rounded-lg border-2"
              [class.border-indigo-500]="deliveryMethod() === 'standard'"
              [class.border-transparent]="deliveryMethod() !== 'standard'"
              aria-hidden="true"
            ></span>
          </div>

          <!-- Express -->
          <div
            class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
            [class.border-indigo-500]="deliveryMethod() === 'express'"
            [class.ring-2]="deliveryMethod() === 'express'"
            [class.ring-indigo-500]="deliveryMethod() === 'express'"
            [class.border-gray-300]="deliveryMethod() !== 'express'"
            (click)="deliveryMethodChange.emit('express')"
          >
            <span class="flex flex-1">
              <span class="flex flex-col">
                <span class="block text-sm font-medium text-gray-900">Express</span>
                <span class="mt-1 flex items-center text-sm text-gray-500">2–5 business days</span>
                <span class="mt-6 text-sm font-medium text-gray-900">$15.00</span>
              </span>
            </span>
            @if (deliveryMethod() === 'express') {
              <svg
                class="h-5 w-5 text-indigo-600"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clip-rule="evenodd"
                />
              </svg>
            }
            <span
              class="pointer-events-none absolute -inset-px rounded-lg border-2"
              [class.border-indigo-500]="deliveryMethod() === 'express'"
              [class.border-transparent]="deliveryMethod() !== 'express'"
              aria-hidden="true"
            ></span>
          </div>
        </div>
      </div>

      <div class="flex items-center justify-between pt-6 border-t border-gray-200">
        <button
          type="button"
          (click)="back.emit()"
          class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          <span aria-hidden="true"> &larr;</span> Back to Information
        </button>
        <button
          type="button"
          (click)="continue.emit()"
          class="rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Continue to Payment
        </button>
      </div>
    </div>
  `,
})
export class CheckoutDeliveryComponent {
  deliveryMethod = input.required<'standard' | 'express'>();
  deliveryMethodChange = output<'standard' | 'express'>();
  continue = output<void>();
  back = output<void>();
}
