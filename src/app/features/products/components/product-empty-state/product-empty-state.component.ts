import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-empty-state',
  standalone: true,
  template: `
    <div class="flex flex-col items-center justify-center py-12">
      <div
        class="w-full text-center py-24 bg-gray-50 rounded-lg border border-dashed border-gray-300"
      >
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            vector-effect="non-scaling-stroke"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
          />
        </svg>
        <h3 class="mt-2 text-sm font-semibold text-gray-900">No products found</h3>
        <p class="mt-1 text-sm text-gray-500">
          Try adjusting your search or filter to find what you're looking for.
        </p>
        <div class="mt-6">
          <button
            (click)="reset.emit()"
            class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Clear filters
          </button>
        </div>

        @if (trendingProducts().length > 0) {
          <div class="mt-10 border-t border-gray-200 pt-10 text-left w-full max-w-2xl mx-auto">
            <h4 class="text-sm font-medium text-gray-900 mb-4">Trending Now</h4>
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
              @for (item of trendingProducts(); track item.id) {
                <div class="group relative flex flex-col items-center">
                  <div
                    class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75"
                  >
                    <img
                      [src]="item.imageUrl"
                      [alt]="item.name"
                      class="h-full w-full object-cover object-center"
                    />
                  </div>
                  <p class="mt-2 text-xs text-gray-900 truncate w-full text-center">
                    {{ item.name }}
                  </p>
                  <button
                    (click)="addToCart.emit(item); $event.stopPropagation()"
                    class="mt-1 text-xs font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
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
  reset = output<void>();
  addToCart = output<Product>();
}
