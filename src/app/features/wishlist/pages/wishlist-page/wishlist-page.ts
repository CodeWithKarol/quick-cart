import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../products/models/product';
import { ProductService } from '../../../products/services/product-service';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../../cart/services/cart-service';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { QuickViewComponent } from '../../../products/components/quick-view/quick-view.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard, QuickViewComponent],
  template: `
    <div class="bg-white">
      <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">Your Wishlist</h2>

        @if (wishlistItems().length === 0) {
          <div class="text-center py-20">
            <svg
              class="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h3 class="mt-2 text-sm font-semibold text-gray-900">No items sent to wishlist</h3>
            <p class="mt-1 text-sm text-gray-500">
              Start saving your favorite items to build your collection.
            </p>
            <div class="mt-6">
              <a
                routerLink="/"
                class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Browse Products
              </a>
            </div>
          </div>
        } @else {
          <div
            class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
          >
            @for (product of wishlistItems(); track product.id; let i = $index) {
              <app-product-card
                [product]="product"
                [priority]="i < 4"
                (addToCart)="onAddToCart($event)"
                (quickView)="onQuickView($event)"
              ></app-product-card>
            }
          </div>
        }
      </div>

      <app-quick-view
        [product]="selectedQuickViewProduct()"
        [isOpen]="!!selectedQuickViewProduct()"
        (closeModal)="closeQuickView()"
      ></app-quick-view>
    </div>
  `,
})
export class WishlistPage {
  private productService = inject(ProductService);
  private wishlistService = inject(WishlistService);
  private cartService = inject(CartService);

  // We need to react to changes in the wishlist
  wishlistIds = this.wishlistService.wishlist;

  // We'll signal to fetch products when component inits or IDs change
  allProducts = toSignal(this.productService.getProducts(), { initialValue: [] });

  // Computed property to filter products that are in the wishlist
  wishlistItems = computed(() => {
    const products = this.allProducts();
    const ids = this.wishlistIds();
    return products.filter((p) => ids.includes(p.id));
  });

  selectedQuickViewProduct = signal<Product | undefined>(undefined);

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  onQuickView(product: Product) {
    this.selectedQuickViewProduct.set(product);
  }

  closeQuickView() {
    this.selectedQuickViewProduct.set(undefined);
  }
}
