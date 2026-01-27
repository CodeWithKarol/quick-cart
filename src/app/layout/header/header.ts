import { Component, inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { map, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';
import { CartService } from '../../features/cart/services/cart-store';
import { WishlistService } from '../../features/wishlist/services/wishlist-store';
import { ProductService } from '../../features/products/services/product-api';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div class="flex h-16 items-center justify-between w-full">
          <div class="flex items-center">
            <a routerLink="/" class="flex items-center gap-2 group">
              <span class="sr-only">QuickCart</span>
              <svg
                class="h-8 w-8 text-indigo-600 transition-transform group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span
                class="logo text-xl font-bold text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors"
                >QuickCart</span
              >
            </a>
            <div class="hidden ml-10 space-x-8 md:block">
              <a
                routerLink="/"
                class="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                routerLinkActive="text-indigo-600"
                [routerLinkActiveOptions]="{ exact: true }"
                >Home</a
              >
              <a
                routerLink="/shop"
                class="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                routerLinkActive="text-indigo-600"
                >Shop</a
              >
            </div>
          </div>

          <!-- Global Search -->
          <div class="flex flex-1 items-center justify-center px-6 lg:ml-6 lg:justify-end">
            <div class="w-full max-w-lg lg:max-w-xs relative">
              <label for="search" class="sr-only">Search</label>
              <div class="relative text-gray-400 focus-within:text-gray-600">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  class="block w-full rounded-md border border-gray-300 bg-white py-1.5 pl-10 pr-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Search products..."
                  type="search"
                  [value]="searchQuery()"
                  (input)="onSearch($event)"
                  (focus)="isSearchFocused.set(true)"
                  (blur)="isSearchFocused.set(false)"
                  (keydown.enter)="onSearchSubmit($event)"
                />
              </div>

              <!-- Autocomplete Dropdown -->
              @if (isSearchFocused() && searchResults().length > 0) {
                <div
                  class="absolute z-10 w-full bg-white shadow-lg rounded-b-md border border-gray-200 mt-1"
                >
                  <ul class="max-h-60 overflow-y-auto py-1">
                    @for (product of searchResults(); track product.id) {
                      <li>
                        <a
                          [routerLink]="['/product', product.id]"
                          (mousedown)="$event.preventDefault()"
                          class="block px-4 py-2 hover:bg-gray-100"
                        >
                          <div class="flex items-center">
                            <div class="relative w-8 h-8 mr-3 flex-shrink-0">
                              <img
                                [ngSrc]="product.imageUrl"
                                fill
                                class="object-cover rounded"
                                alt=""
                              />
                            </div>
                            <div>
                              <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                              <p class="text-xs text-gray-500">{{ product.category }}</p>
                            </div>
                          </div>
                        </a>
                      </li>
                    }
                  </ul>
                </div>
              }
            </div>
          </div>

          <div class="flex items-center gap-4">
            <a
              routerLink="/wishlist"
              class="group -m-2 flex items-center p-2 text-gray-700 hover:text-indigo-600 transition-colors"
            >
              <div class="relative">
                <svg
                  class="h-6 w-6 flex-shrink-0 group-hover:text-indigo-600 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                @if (wishlistCount() > 0) {
                  <span
                    class="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full min-w-[1.25rem] h-5 ring-2 ring-white"
                  >
                    {{ wishlistCount() }}
                  </span>
                }
              </div>
              <span class="sr-only">Wishlist</span>
            </a>

            <button
              type="button"
              (click)="openCart()"
              class="group -m-2 flex items-center p-2 text-gray-700 hover:text-indigo-600 transition-colors"
              style="background: none; border: none; cursor: pointer;"
            >
              <span class="sr-only">items in cart, view bag</span>
              <div class="relative">
                <svg
                  class="h-6 w-6 flex-shrink-0 group-hover:text-indigo-600 transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                @if (cartCount() > 0) {
                  <span
                    class="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-indigo-600 rounded-full min-w-[1.25rem] h-5 ring-2 ring-white"
                  >
                    {{ cartCount() }}
                  </span>
                }
              </div>
              <span
                class="ml-2 text-sm font-medium text-gray-700 group-hover:text-indigo-600 hidden sm:block"
                >Cart</span
              >
            </button>
            <div class="flex md:hidden">
              <button
                type="button"
                (click)="toggleMobileMenu()"
                class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <!-- Mobile menu, show/hide based on menu state. -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden" role="dialog" aria-modal="true">
          <!-- Background backdrop, show/hide based on slide-over state. -->
          <div class="fixed inset-0 z-50"></div>
          <div
            class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 shadow-xl"
          >
            <div class="flex items-center justify-between">
              <a routerLink="/" class="-m-1.5 p-1.5 flex items-center gap-2">
                <span class="sr-only">QuickCart</span>
                <svg
                  class="h-8 w-8 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                <span class="text-xl font-bold text-gray-900 tracking-tight">QuickCart</span>
              </a>
              <button
                type="button"
                (click)="toggleMobileMenu()"
                class="-m-2.5 rounded-md p-2.5 text-gray-700"
              >
                <span class="sr-only">Close menu</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="mt-6 flow-root">
              <div class="-my-6 divide-y divide-gray-500/10">
                <div class="space-y-2 py-6">
                  <a
                    routerLink="/"
                    (click)="toggleMobileMenu()"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    routerLinkActive="bg-gray-50 text-indigo-600"
                    [routerLinkActiveOptions]="{ exact: true }"
                    >Home</a
                  >
                  <a
                    routerLink="/shop"
                    (click)="toggleMobileMenu()"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    routerLinkActive="bg-gray-50 text-indigo-600"
                    >Shop</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </header>
  `,
})
export class Header {
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private productService = inject(ProductService);
  private router = inject(Router);

  cartCount = this.cartService.cartCount;
  wishlistCount = computed(() => this.wishlistService.wishlist().length);
  isMobileMenuOpen = signal(false);

  // Search
  searchQuery = signal('');
  isSearchFocused = signal(false);

  // Reactive search results
  searchResults = toSignal(
    toObservable(this.searchQuery).pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query) => {
        if (query.length > 1) {
          return this.productService
            .getProducts()
            .pipe(
              map((products) =>
                products
                  .filter((p) => p.name.toLowerCase().includes(query.toLowerCase()))
                  .slice(0, 5),
              ),
            );
        }
        return of([]);
      }),
    ),
    { initialValue: [] },
  );

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((v) => !v);
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  onSearchSubmit(event: Event) {
    event.preventDefault();
    this.router.navigate(['/'], { queryParams: { q: this.searchQuery() } });
    this.isSearchFocused.set(false);
  }

  openCart() {
    this.cartService.openDrawer();
  }
}
