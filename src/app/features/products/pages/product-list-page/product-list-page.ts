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
import { ProductService } from '../../services/product-api';
import { CartService } from '../../../cart/services/cart-store';
import { ProductCard } from '../../components/product-card/product-card';
import { QuickViewComponent } from '../../components/quick-view/quick-view-dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../models/product';
import { ProductListHero } from '../../components/product-list-hero/product-list-hero.component';
import { ProductFilters } from '../../components/product-filters/product-filters.component';
import { ProductEmptyState } from '../../components/product-empty-state/product-empty-state.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    ProductCard,
    QuickViewComponent,
    ProductListHero,
    ProductFilters,
    ProductEmptyState,
  ],
  template: `
    <div class="bg-white min-h-screen">
      <!-- Hero Section -->
      <app-product-list-hero />

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
            <app-product-filters
              [categories]="categories()"
              [selectedCategory]="selectedCategory()"
              [minPrice]="minPrice()"
              [maxPrice]="maxPrice()"
              [minRating]="minRating()"
              (categoryChange)="selectedCategory.set($event)"
              (minPriceChange)="minPrice.set($event)"
              (maxPriceChange)="maxPrice.set($event)"
              (ratingChange)="minRating.set($event)"
              (reset)="resetFilters()"
            />

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
                  <app-product-empty-state
                    [trendingProducts]="trendingProducts()"
                    (reset)="resetFilters()"
                    (addToCart)="onAddToCart($event)"
                  />
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

  trendingProducts = computed(() => this.products().slice(0, 4));

  isLoading = computed(() => this.products().length === 0);

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params['q']) {
        this.searchQuery.set(params['q']);
      }
      if (params['category']) {
        this.selectedCategory.set(params['category']);
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
