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
      <div class="bg-indigo-600 px-4 py-3 text-white">
        <p class="text-center text-sm font-medium">
          Get free delivery on orders over $100
          <a href="#" class="underline hover:text-indigo-100">Browse products &rarr;</a>
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
