import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainerComponent } from './shared/components/toast/toast-widget';
import { CartDrawerComponent } from './features/cart/components/cart-drawer/cart-drawer';
import { Header } from './layout/header/header';
import { Footer } from './layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastContainerComponent, CartDrawerComponent, Header, Footer],
  template: `
    <app-toast-container></app-toast-container>
    <app-cart-drawer></app-cart-drawer>
    <div class="min-h-screen flex flex-col bg-gray-50 font-sans text-gray-900">
      <!-- Promo Bar -->
      <div
        class="bg-secondary-50/80 backdrop-blur-md px-4 py-3 text-primary-900 border-b border-secondary-200/50 sticky top-0 z-40"
      >
        <p class="text-center text-[9px] sm:text-xs font-bold tracking-[0.2em] uppercase">
          Free delivery on orders over $100.
          <a
            href="#"
            class="ml-2 border-b-2 border-primary-900 pb-0.5 hover:text-primary-600 transition-all whitespace-nowrap inline-block font-black"
            >Browse Collections &rarr;</a
          >
        </p>
      </div>

      <div class="sticky top-[41px] sm:top-[45px] z-50 transition-all duration-500">
        <app-header></app-header>
      </div>

      <main class="flex-grow flex flex-col">
        <router-outlet></router-outlet>
      </main>

      <app-footer></app-footer>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShell {}
