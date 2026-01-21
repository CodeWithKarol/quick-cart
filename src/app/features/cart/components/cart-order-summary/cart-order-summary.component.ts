import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-order-summary',
  imports: [CommonModule, RouterLink],
  template: `
    <section
      aria-labelledby="summary-heading"
      class="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8"
    >
      <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

      <dl class="mt-6 space-y-4">
        <div class="flex items-center justify-between">
          <dt class="text-sm text-gray-600">Subtotal</dt>
          <dd class="text-sm font-medium text-gray-900">{{ subtotal() | currency }}</dd>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt class="flex items-center text-sm text-gray-600">
            <span>Shipping estimate</span>
            <div class="relative ml-2 group">
              <div class="flex-shrink-0 text-gray-400 hover:text-gray-500 cursor-help">
                <span class="sr-only">Learn more about how shipping is calculated</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fill-rule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
              <div
                class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-50 text-center"
              >
                Shipping costs are calculated based on your location and selected delivery method.
                <div
                  class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"
                ></div>
              </div>
            </div>
          </dt>
          <dd class="text-sm font-medium text-gray-900">{{ shipping() | currency }}</dd>
        </div>
        <div class="flex items-center justify-between border-t border-gray-200 pt-4">
          <dt class="text-base font-medium text-gray-900">Order total</dt>
          <dd class="text-base font-medium text-gray-900">
            {{ total() | currency }}
          </dd>
        </div>
      </dl>

      <div class="mt-6">
        <button
          routerLink="/checkout"
          class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
        >
          Checkout
        </button>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartOrderSummaryComponent {
  subtotal = input.required<number>();
  shipping = input<number>(5.0);

  total = computed(() => this.subtotal() + this.shipping());
}
