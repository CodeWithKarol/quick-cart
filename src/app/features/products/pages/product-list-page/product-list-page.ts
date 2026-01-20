import {
  Component,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../../cart/services/cart-service';
import { ProductCard } from '../../components/product-card/product-card';
import { QuickViewComponent } from '../../components/quick-view/quick-view.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCard, QuickViewComponent],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Hero Section -->
      <div class="relative bg-gray-900 border-b-4 border-indigo-600">
        <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
          <img
            src="https://placehold.co/1920x600/111827/4F46E5?text=Summer+Collection+2026"
            alt=""
            class="h-full w-full object-cover object-center opacity-40 mix-blend-multiply"
          />
        </div>
        <div
          class="relative mx-auto max-w-3xl flex flex-col items-center px-6 py-32 text-center sm:py-48 lg:px-0"
        >
          <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">New Arrivals</h1>
          <p class="mt-4 text-xl text-gray-300">
            Check out our latest collection of premium products. Designed for style, engineered for
            performance.
          </p>
          <a
            href="#products-heading"
            class="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100"
            >Shop Now</a
          >
        </div>
      </div>

      <main class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-16">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">All Products</h2>

          <div class="flex items-center">
            <div class="relative inline-block text-left">
              <select
                class="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 border-none bg-transparent focus:ring-0"
                (change)="updateSort($event)"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Best Rating</option>
              </select>
            </div>
          </div>
        </div>

        <section aria-labelledby="products-heading" class="pb-24 pt-6">
          <h2 id="products-heading" class="sr-only">Products</h2>

          <div class="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <!-- Filters -->
            <form class="hidden lg:block lg:sticky lg:top-24 h-fit">
              <h3 class="sr-only">Categories</h3>
              <ul
                role="list"
                class="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
              >
                <li
                  class="flex items-center justify-between cursor-pointer group"
                  tabindex="0"
                  (click)="selectedCategory.set('')"
                  (keyup.enter)="selectedCategory.set('')"
                >
                  <span [class.text-indigo-600]="selectedCategory() === ''">All Categories</span>
                </li>
                @for (cat of categories(); track cat) {
                  <li
                    class="flex items-center justify-between cursor-pointer group"
                    tabindex="0"
                    (click)="selectedCategory.set(cat)"
                    (keyup.enter)="selectedCategory.set(cat)"
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
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
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
                        <div
                          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                        >
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
                        <div
                          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                        >
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
                      (change)="minRating.set(4)"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <span class="text-sm text-gray-600 flex items-center">
                      4+ Stars
                      <svg
                        class="h-4 w-4 text-yellow-400 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
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
                      (change)="minRating.set(3)"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <span class="text-sm text-gray-600 flex items-center">
                      3+ Stars
                      <svg
                        class="h-4 w-4 text-yellow-400 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
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
                      (change)="minRating.set(0)"
                      class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    <span class="text-sm text-gray-600">All Ratings</span>
                  </label>
                </div>
              </div>

              <div class="mt-6">
                <button
                  type="button"
                  (click)="resetFilters()"
                  class="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                >
                  Reset Filters
                </button>
              </div>
            </form>

            <!-- Product grid -->
            <div class="lg:col-span-3">
              @if (isLoading()) {
                <div class="flex justify-center items-center h-64">
                  <div
                    class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"
                  ></div>
                </div>
              } @else {
                @if (filteredProducts().length > 0) {
                  <div class="grid grid-cols-1 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    @for (product of filteredProducts(); track product.id; let i = $index) {
                      <app-product-card
                        [product]="product"
                        [priority]="i < 4"
                        (addToCart)="onAddToCart($event)"
                        (quickView)="onQuickView($event)"
                        class="bg-white rounded-lg"
                      >
                      </app-product-card>
                    }
                  </div>
                } @else {
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
                          (click)="resetFilters()"
                          class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Clear filters
                        </button>
                      </div>
                    </div>
                  </div>
                }
              }
            </div>
          </div>
        </section>
      </main>

      <app-quick-view
        [product]="selectedQuickViewProduct()"
        [isOpen]="!!selectedQuickViewProduct()"
        (closeModal)="closeQuickView()"
      ></app-quick-view>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListPage implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);

  // Signals for state
  searchQuery = signal('');
  selectedCategory = signal('');
  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);
  minRating = signal<number>(0);
  sortOption = signal('newest');

  // Load products using toSignal
  products = toSignal(this.productService.getProducts(), { initialValue: [] });

  categories = computed(() => {
    const allProducts = this.products();
    return [...new Set(allProducts.map((p) => p.category))];
  });

  filteredProducts = computed(() => {
    let result = this.products();
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();
    const minP = this.minPrice();
    const maxP = this.maxPrice();
    const rating = this.minRating();
    const sort = this.sortOption();

    result = result.filter((p) => {
      // Text Search
      const matchesSearch =
        p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query);
      if (!matchesSearch) return false;

      // Category
      if (category && p.category !== category) return false;

      // Price
      if (minP !== null && p.price < minP) return false;
      if (maxP !== null && p.price > maxP) return false;

      // Rating
      if (p.rating < rating) return false;

      return true;
    });

    // Sort
    switch (sort) {
      case 'price-asc':
        result = result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      default: // newest
        result = result.sort((a, b) => b.id - a.id);
    }

    return result;
  });

  isLoading = computed(() => this.products().length === 0);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['q']) {
        this.searchQuery.set(params['q']);
      }
    });
  }

  updateSort(event: Event) {
    const input = event.target as HTMLSelectElement;
    this.sortOption.set(input.value);
  }

  updateSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  updateMinPrice(event: Event) {
    const input = event.target as HTMLInputElement;
    this.minPrice.set(input.value ? Number(input.value) : null);
  }

  updateMaxPrice(event: Event) {
    const input = event.target as HTMLInputElement;
    this.maxPrice.set(input.value ? Number(input.value) : null);
  }

  resetFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('');
    this.minPrice.set(null);
    this.maxPrice.set(null);
    this.minRating.set(0);
  }

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  selectedQuickViewProduct = signal<Product | undefined>(undefined);

  onQuickView(product: Product) {
    this.selectedQuickViewProduct.set(product);
  }

  closeQuickView() {
    this.selectedQuickViewProduct.set(undefined);
  }
}
