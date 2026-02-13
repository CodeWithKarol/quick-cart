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
      <!-- Promo Bar -->
      <div class="bg-secondary-50 px-4 py-2.5 text-primary-900 border-b border-secondary-200">
        <p class="text-center text-xs font-bold tracking-widest uppercase">
          Get free delivery on orders over $100.
          <a href="#" class="ml-1 border-b border-primary-900 pb-0.5 hover:text-primary-600 hover:border-primary-600 transition-colors">Browse products &rarr;</a>
        </p>
      </div>

      <app-header></app-header>

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
