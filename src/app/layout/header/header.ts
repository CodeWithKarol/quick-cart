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
  styles: [
    `
      input[type='search']::-webkit-search-cancel-button {
        -webkit-appearance: none;
        display: none;
      }
    `,
  ],
  template: `
     <header class="sticky top-0 z-40 transition-all duration-300">
      <div class="absolute inset-0 bg-primary-950/95 backdrop-blur-md shadow-lg border-b border-white/5" aria-hidden="true"></div>
      
      <nav class="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div class="flex h-20 items-center justify-between w-full">
          <!-- Logo & Nav -->
          <div class="flex items-center gap-12">
            <a routerLink="/" class="flex items-center gap-3 group">
              <span class="sr-only">QuickCart</span>
              <!-- Logo Icon - Simplified -->
              <svg
                class="h-8 w-8 text-white transition-transform duration-500 group-hover:rotate-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <span
                class="logo text-2xl font-display font-medium text-white tracking-wide"
                >QuickCart</span
              >
            </a>
            
            <!-- Desktop Nav -->
            <div class="hidden md:flex space-x-8">
              <a
                routerLink="/"
                class="text-xs font-bold uppercase tracking-widest text-secondary-300 hover:text-white transition-colors py-1"
                routerLinkActive="text-white border-b border-white"
                [routerLinkActiveOptions]="{ exact: true }"
                >Home</a
              >
              <a
                routerLink="/shop"
                class="text-xs font-bold uppercase tracking-widest text-secondary-300 hover:text-white transition-colors py-1"
                routerLinkActive="text-white border-b border-white"
                >Shop</a
              >
            </div>
          </div>

          <!-- Search & Actions -->
          <div class="flex items-center gap-6">
            
            <!-- Search Bar (Desktop) -->
            <div class="hidden lg:block relative w-72 group">
              <label for="search" class="sr-only">Search</label>
              <div class="relative">
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg class="h-4 w-4 text-primary-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fill-rule="evenodd"
                      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <input
                  id="search"
                  class="block w-full rounded border-0 bg-primary-900/80 py-2 pr-10 pl-4 text-primary-100 shadow-sm ring-1 ring-inset ring-primary-800 placeholder:text-primary-500 focus:bg-primary-900 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 transition-all"
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
                  class="absolute right-0 z-50 w-80 bg-white shadow-xl rounded-sm mt-2 overflow-hidden ring-1 ring-black/5"
                >
                  <ul class="max-h-80 overflow-y-auto w-full">
                    @for (product of searchResults(); track product.id) {
                      <li>
                        <a
                          [routerLink]="['/product', product.id]"
                          (mousedown)="$event.preventDefault()"
                          class="block px-4 py-3 hover:bg-secondary-50 transition-colors group/item"
                        >
                          <div class="flex items-center gap-4">
                            <div class="relative w-10 h-12 flex-shrink-0 bg-secondary-100">
                              <img
                                [ngSrc]="product.imageUrl"
                                fill
                                class="object-cover"
                                alt=""
                              />
                            </div>
                            <div>
                              <p class="text-sm font-medium text-primary-900 group-hover/item:text-primary-600 font-display">{{ product.name }}</p>
                              <p class="text-xs text-primary-500">{{ product.category }}</p>
                            </div>
                          </div>
                        </a>
                      </li>
                    }
                  </ul>
                </div>
              }
            </div>

            <!-- Icons -->
            <div class="flex items-center gap-5">
              <a
                routerLink="/wishlist"
                class="group flex items-center text-secondary-300 hover:text-white transition-colors relative"
              >
                <span class="sr-only">Wishlist</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1"
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
                    class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary-900"
                  >
                    {{ wishlistCount() }}
                  </span>
                }
              </a>
  
              <button
                type="button"
                (click)="openCart()"
                class="group flex items-center text-secondary-300 hover:text-white transition-colors relative"
              >
                <span class="sr-only">Cart</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                @if (cartCount() > 0) {
                  <span
                    class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary-900"
                  >
                    {{ cartCount() }}
                  </span>
                }
              </button>
  
              <div class="flex md:hidden">
                <button
                  type="button"
                  (click)="toggleMobileMenu()"
                  class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
                >
                  <span class="sr-only">Open main menu</span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1"
                    stroke="currentColor"
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
        </div>
      </nav>
      
      <!-- Mobile menu -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden relative z-50">
          <button type="button" class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity w-full h-full border-none cursor-default" (click)="toggleMobileMenu()" tabindex="-1" aria-hidden="true"></button>
          <div class="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-primary-950 px-6 py-6 sm:max-w-sm border-l border-white/10">
            <div class="flex items-center justify-between">
              <a routerLink="/" class="-m-1.5 p-1.5 flex items-center gap-2">
                 <span class="text-xl font-bold font-display text-white tracking-wide">QuickCart</span>
              </a>
              <button
                type="button"
                (click)="toggleMobileMenu()"
                class="-m-2.5 rounded-md p-2.5 text-gray-400 hover:text-white"
              >
                <span class="sr-only">Close menu</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div class="mt-8 flow-root">
              <div class="-my-6 divide-y divide-white/10">
                <div class="space-y-2 py-6">
                  <a
                    routerLink="/"
                    (click)="toggleMobileMenu()"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/5"
                    >Home</a
                  >
                  <a
                    routerLink="/shop"
                    (click)="toggleMobileMenu()"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/5"
                    >Shop</a
                  >
                  <a
                    routerLink="/wishlist"
                    (click)="toggleMobileMenu()"
                    class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-white/5"
                    >Wishlist</a
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
