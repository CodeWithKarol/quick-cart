import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../products/services/product-service';
import { CartService } from '../../../cart/services/cart-service';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { QuickViewComponent } from '../../../products/components/quick-view/quick-view.component';
import { map } from 'rxjs/operators';
import { Product } from '../../../products/models/product';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard, QuickViewComponent],
  template: `
    <!-- Hero Section -->
    <div class="relative bg-white overflow-hidden">
      <div class="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
          <div class="sm:max-w-lg">
            <h1 class="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
              Curated Quality for Modern Living
            </h1>
            <p class="mt-4 text-xl text-gray-500">
              Discover our new collection of ethically crafted home goods and accessories. Designed
              to last, made to be loved.
            </p>
            <div class="mt-10">
              <a
                routerLink="/shop"
                class="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg md:px-10 shadow-sm transition-colors cursor-pointer"
              >
                Shop New Arrivals
              </a>
              <a
                routerLink="/shop"
                class="ml-4 inline-block px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 md:text-lg md:px-10 shadow-sm transition-colors cursor-pointer"
              >
                View Lookbook
              </a>
            </div>
          </div>
          <div class="mt-10">
            <div
              aria-hidden="true"
              class="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
            >
              <div
                class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8"
              >
                <div class="flex items-center space-x-6 lg:space-x-8">
                  <div class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div
                      class="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100 relative shadow-lg"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Modern arm chair"
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div class="w-44 h-64 rounded-lg overflow-hidden relative shadow-lg">
                      <img
                        src="https://images.unsplash.com/photo-1616486338812-3dadae4b4f9d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Minimalist vase"
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                  </div>
                  <div class="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                    <div class="w-44 h-64 rounded-lg overflow-hidden relative shadow-lg">
                      <img
                        src="https://images.unsplash.com/photo-1567016432966-bed43d7b5296?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Modern sofa"
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div class="w-44 h-64 rounded-lg overflow-hidden relative shadow-lg">
                      <img
                        src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Bright living room"
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                    <div class="w-44 h-64 rounded-lg overflow-hidden relative shadow-lg">
                      <img
                        src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Interior plant"
                        class="w-full h-full object-center object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Feature Section (Bento Grid) -->
    <div class="bg-gray-50 py-24 sm:py-32">
      <div class="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2 class="text-base font-semibold leading-7 text-indigo-600">Everything you need</h2>
        <p class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Built in quality, designed for you
        </p>
        <div class="mt-10 grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-8">
          <div
            class="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600 mb-4">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold leading-8 text-gray-900">Fast Shipping</h3>
            <p class="mt-2 text-base leading-7 text-gray-600">
              We ship worldwide with 2-day delivery options available for select regions. Tracking
              included.
            </p>
          </div>
          <div
            class="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600 mb-4">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold leading-8 text-gray-900">Quality Guarantee</h3>
            <p class="mt-2 text-base leading-7 text-gray-600">
              Every item is rigorously tested. If you're not satisfied, we offer a 30-day money-back
              guarantee.
            </p>
          </div>
          <div
            class="group relative bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div class="h-10 w-10 flex items-center justify-center rounded-lg bg-indigo-600 mb-4">
              <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="text-lg font-semibold leading-8 text-gray-900">Sustainable</h3>
            <p class="mt-2 text-base leading-7 text-gray-600">
              We donate 1% of all revenue to carbon removal projects. Shop with a clear conscience.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Trending Products -->
    <div class="bg-white">
      <div class="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <div class="md:flex md:items-center md:justify-between">
          <h2 class="text-2xl font-bold tracking-tight text-gray-900">Trending Now</h2>
          <a
            routerLink="/shop"
            class="hidden text-sm font-medium text-indigo-600 hover:text-indigo-500 md:block cursor-pointer"
          >
            Browse the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>

        <div
          class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
        >
          @for (product of featuredProducts(); track product.id; let i = $index) {
            <app-product-card
              [product]="product"
              [priority]="i < 4"
              (addToCart)="onAddToCart($event)"
              (quickView)="onQuickView($event)"
            >
            </app-product-card>
          }
        </div>

        <div class="mt-8 text-sm md:hidden">
          <a
            routerLink="/shop"
            class="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
          >
            Browse the collection
            <span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </div>

    <!-- Newsletter -->
    <div class="bg-indigo-700 py-16 sm:py-24">
      <div class="relative sm:py-16">
        <div aria-hidden="true" class="hidden sm:block">
          <svg
            class="absolute top-8 left-1/2 -ml-3"
            width="404"
            height="392"
            fill="none"
            viewBox="0 0 404 392"
          >
            <defs>
              <pattern
                id="8228f071-bcee-4ec8-905a-2a059a2cc4fb"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="392" fill="url(#8228f071-bcee-4ec8-905a-2a059a2cc4fb)" />
          </svg>
        </div>
        <div class="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-7xl lg:px-8">
          <div
            class="relative rounded-2xl px-6 py-10 bg-indigo-600 overflow-hidden shadow-xl sm:px-12 sm:py-20"
          >
            <div aria-hidden="true" class="absolute inset-0 -mt-72 sm:-mt-32 md:mt-0">
              <svg
                class="absolute inset-0 h-full w-full"
                preserveAspectRatio="xMidYMid slice"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 1463 360"
              >
                <path
                  class="text-indigo-500 text-opacity-40"
                  fill="currentColor"
                  d="M-82.673 72l1761.849 472.086-134.327 501.315-1761.85-472.086z"
                />
                <path
                  class="text-indigo-700 text-opacity-40"
                  fill="currentColor"
                  d="M-217.088 544.086L1544.761 72l134.327 501.316-1761.849 472.086z"
                />
              </svg>
            </div>
            <div class="relative">
              <div class="sm:text-center">
                <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  Get notified when we launch.
                </h2>
                <p class="mx-auto mt-6 max-w-2xl text-lg text-indigo-200">
                  Sagittis scelerisque nulla cursus in enim consectetur quam. Dictum urna sed
                  consectetur neque tristique pellentesque.
                </p>
              </div>
              <form action="#" class="mt-12 sm:mx-auto sm:max-w-lg sm:flex">
                <div class="min-w-0 flex-1">
                  <label for="cta-email" class="sr-only">Email address</label>
                  <input
                    id="cta-email"
                    type="email"
                    class="block w-full border border-transparent rounded-md px-5 py-3 text-base text-gray-900 bg-white placeholder-gray-500 shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
                    placeholder="Enter your email"
                  />
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-3">
                  <button
                    type="submit"
                    class="block w-full rounded-md border border-transparent px-5 py-3 bg-indigo-500 text-base font-medium text-white shadow hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 sm:px-10"
                  >
                    Notify me
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <app-quick-view
      [product]="selectedQuickViewProduct()"
      [isOpen]="!!selectedQuickViewProduct()"
      (closeModal)="closeQuickView()"
    ></app-quick-view>
  `,
})
export class HomePage {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  // Get first 4 products for trending, using toSignal to unwrap the Observable
  featuredProducts = toSignal(
    this.productService.getProducts().pipe(map((products) => products.slice(0, 4))),
    { initialValue: [] },
  );

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
