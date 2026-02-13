import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-empty-state',
  standalone: true,
  imports: [CurrencyPipe],
  template: `
    <div class="flex flex-col items-center justify-center py-24">
      <div
        class="w-full text-center max-w-md mx-auto"
      >
        <svg
          class="mx-auto h-16 w-16 text-primary-200"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <h3 class="mt-4 text-lg font-display font-medium text-primary-900">No products found</h3>
        <p class="mt-2 text-sm text-primary-500 font-light">
          We couldn't find any matches for your filters. Try adjusting your search.
        </p>
        <div class="mt-8">
          <button
            (click)="resetFilters.emit()"
            class="inline-flex items-center border-b border-primary-900 pb-1 text-xs font-bold uppercase tracking-widest text-primary-900 hover:text-primary-600 hover:border-primary-600 transition-colors"
          >
            Clear all filters
          </button>
        </div>

        @if (trendingProducts().length > 0) {
          <div class="mt-16 border-t border-primary-100 pt-10 text-center w-full">
            <h4 class="text-xs font-bold uppercase tracking-widest text-primary-400 mb-8">You might also like</h4>
            <div class="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
              @for (item of trendingProducts(); track item.id) {
                <button type="button" class="group relative flex flex-col items-start text-left cursor-pointer w-full bg-transparent border-none p-0" (click)="addToCart.emit(item)">
                  <div
                    class="aspect-[4/5] w-full overflow-hidden bg-secondary-100 mb-3"
                  >
                    <img
                      [src]="item.imageUrl"
                      [alt]="item.name"
                      class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <p class="text-sm font-medium text-primary-900 font-display">
                    {{ item.name }}
                  </p>
                  <p class="text-xs text-primary-500 mt-1">{{ item.price | currency }}</p>
                </button>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEmptyState {
  trendingProducts = input.required<Product[]>();
  resetFilters = output<void>();
  addToCart = output<Product>();
}
