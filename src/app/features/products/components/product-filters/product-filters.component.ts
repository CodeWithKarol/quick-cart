import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-product-filters',
  standalone: true,
  template: `
    <form class="hidden lg:block lg:sticky lg:top-24 h-fit">
      <h3 class="sr-only">Categories</h3>
      <ul
        role="list"
        class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
      >
        <li
          class="flex items-center justify-between cursor-pointer group"
          tabindex="0"
          (click)="categoryChange.emit('')"
          (keyup.enter)="categoryChange.emit('')"
        >
          <span [class.text-indigo-600]="selectedCategory() === ''">All Categories</span>
        </li>
        @for (cat of categories(); track cat) {
          <li
            class="flex items-center justify-between cursor-pointer group"
            tabindex="0"
            (click)="categoryChange.emit(cat)"
            (keyup.enter)="categoryChange.emit(cat)"
          >
            <span [class.text-indigo-600]="selectedCategory() === cat">{{ cat }}</span>
            @if (selectedCategory() === cat) {
              <svg
                class="h-4 w-4 text-indigo-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            }
          </li>
        }
      </ul>

      <div class="border-b border-gray-200 py-6">
        <h3 class="-my-3 flow-root">
          <span class="font-medium text-gray-900">Price</span>
        </h3>
        <div class="pt-6" id="filter-section-price">
          <div class="space-y-4">
            <div class="flex items-center gap-2">
              <div class="relative rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  [value]="minPrice()"
                  (input)="updateMinPrice($event)"
                  placeholder="Min"
                  class="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <span class="text-gray-500">-</span>
              <div class="relative rounded-md shadow-sm">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span class="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  [value]="maxPrice()"
                  (input)="updateMaxPrice($event)"
                  placeholder="Max"
                  class="block w-full rounded-md border-0 py-1.5 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border-b border-gray-200 py-6">
        <h3 class="-my-3 flow-root">
          <span class="font-medium text-gray-900">Rating</span>
        </h3>
        <div class="pt-6 space-y-2">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="rating"
              [checked]="minRating() === 4"
              (change)="ratingChange.emit(4)"
              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <span class="text-sm text-gray-600 flex items-center">
              4+ Stars
              <svg class="h-4 w-4 text-yellow-400 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="rating"
              [checked]="minRating() === 3"
              (change)="ratingChange.emit(3)"
              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <span class="text-sm text-gray-600 flex items-center">
              3+ Stars
              <svg class="h-4 w-4 text-yellow-400 ml-1" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="rating"
              [checked]="minRating() === 0"
              (change)="ratingChange.emit(0)"
              class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <span class="text-sm text-gray-600">All Ratings</span>
          </label>
        </div>
      </div>

      <div class="mt-6">
        <button
          type="button"
          (click)="reset.emit()"
          class="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Reset Filters
        </button>
      </div>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFilters {
  categories = input.required<string[]>();
  selectedCategory = input.required<string>();
  minPrice = input<number | null>(null);
  maxPrice = input<number | null>(null);
  minRating = input<number>(0);

  categoryChange = output<string>();
  minPriceChange = output<number | null>();
  maxPriceChange = output<number | null>();
  ratingChange = output<number>();
  reset = output<void>();

  updateMinPrice(event: Event) {
    const input = event.target as HTMLInputElement;
    this.minPriceChange.emit(input.value ? Number(input.value) : null);
  }

  updateMaxPrice(event: Event) {
    const input = event.target as HTMLInputElement;
    this.maxPriceChange.emit(input.value ? Number(input.value) : null);
  }
}
