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
    <div class="product-list-container">
      <header>
        <h2>Our Products</h2>
        <div class="filters">
          <input
            type="text"
            placeholder="Search products..."
            (input)="updateSearch($event)"
            class="search-input"
          />
          <select (change)="updateCategory($event)" class="category-select">
            <option value="">All Categories</option>
            @for (cat of categories(); track cat) {
            <option [value]="cat">{{ cat }}</option>
            }
          </select>
        </div>
      </header>

      @if (isLoading()) {
      <div class="loading">Loading products...</div>
      } @else {
      <div class="grid">
        @for (product of filteredProducts(); track product.id) {
        <app-product-card [product]="product" (addToCart)="onAddToCart($event)"> </app-product-card>
        } @empty {
        <div class="no-results">No products found.</div>
        }
      </div>
      }
    </div>
  `,
  styles: [
    `
      .product-list-container {
        padding: 20px;
        max-width: 1200px;
        margin: 0 auto;
      }
      header {
        margin-bottom: 24px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 16px;
      }
      h2 {
        margin: 0;
        color: #333;
      }
      .filters {
        display: flex;
        gap: 12px;
      }
      .search-input,
      .category-select {
        padding: 8px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 24px;
      }
      .loading,
      .no-results {
        text-align: center;
        padding: 40px;
        font-size: 1.2rem;
        color: #666;
      }
    `,
  ],
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
