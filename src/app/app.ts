import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from './core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <header class="bg-white shadow-sm sticky top-0 z-50">
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
                  class="text-xl font-bold text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors"
                  >QuickCart</span
                >
              </a>
              <div class="hidden ml-10 space-x-8 lg:block">
                <a
                  routerLink="/"
                  routerLinkActive="text-indigo-600"
                  [routerLinkActiveOptions]="{ exact: true }"
                  class="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors"
                  >Products</a
                >
              </div>
            </div>
            <div class="ml-10 space-x-4">
              <a
                routerLink="/cart"
                routerLinkActive="text-indigo-600"
                class="group -m-2 flex items-center p-2 text-gray-700 hover:text-indigo-600 transition-colors"
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
              </a>
            </div>
          </div>
        </nav>
      </header>

      <main class="flex-grow">
        <router-outlet></router-outlet>
      </main>

      <footer class="bg-white border-t border-gray-200 mt-auto">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p class="text-center text-sm text-gray-500">
            &copy; 2026 QuickCart. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private cartService = inject(CartService);
  cartCount = this.cartService.cartCount;
}
