import { Component, inject, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { ProductCardComponent } from '../../shared/components/product-card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="bg-white min-h-screen">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">Our Products</h2>

          <div class="flex flex-col sm:flex-row gap-4">
            <div class="relative">
              <input
                type="text"
                [value]="searchQuery()"
                placeholder="Search products..."
                (input)="updateSearch($event)"
                class="block w-full rounded-md border-0 py-1.5 pl-4 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-sm"
              />
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <svg
                  class="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </div>

            <div class="relative">
              <select
                [value]="selectedCategory()"
                (change)="updateCategory($event)"
                class="block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 shadow-sm"
              >
                <option value="">All Categories</option>
                @for (cat of categories(); track cat) {
                <option [value]="cat">{{ cat }}</option>
                }
              </select>
            </div>
          </div>
        </div>

        @if (isLoading()) {
        <div class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
        } @else {
        <div
          class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
        >
          @for (product of filteredProducts(); track product.id; let i = $index) {
          <app-product-card
            [product]="product"
            [priority]="i < 4"
            (addToCart)="onAddToCart($event)"
          >
          </app-product-card>
          } @empty {
          <div
            class="col-span-full text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300"
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
                (click)="resetFilters()"
                class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Clear filters
              </button>
            </div>
          </div>
          }
        </div>
        }
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  // Signals for state
  searchQuery = signal('');
  selectedCategory = signal('');

  // Load products using toSignal for easy async handling
  products = toSignal(this.productService.getProducts(), { initialValue: [] });

  resetFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('');
  }

  // Computed derived state for filtering
  filteredProducts = computed(() => {
    const allProducts = this.products();
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();

    return allProducts.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
      const matchesCategory = category ? p.category === category : true;
      return matchesSearch && matchesCategory;
    });
  });

  categories = computed(() => {
    const allProducts = this.products();
    return [...new Set(allProducts.map((p) => p.category))];
  });

  isLoading = computed(() => this.products().length === 0);

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  updateCategory(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.selectedCategory.set(select.value);
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
