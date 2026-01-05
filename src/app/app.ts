import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from './core/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="header-content">
          <a routerLink="/" class="logo">QuickCart</a>
          <nav>
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }"
              >Products</a
            >
            <a routerLink="/cart" routerLinkActive="active" class="cart-link">
              Cart @if (cartCount() > 0) {
              <span class="badge">{{ cartCount() }}</span>
              }
            </a>
          </nav>
        </div>
      </header>

      <main>
        <router-outlet></router-outlet>
      </main>

      <footer>
        <p>&copy; 2026 QuickCart. All rights reserved.</p>
      </footer>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial,
          sans-serif;
        color: #333;
        line-height: 1.6;
      }
      .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      .app-header {
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      .header-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .logo {
        font-size: 1.5rem;
        font-weight: bold;
        color: #007bff;
        text-decoration: none;
      }
      nav {
        display: flex;
        gap: 20px;
      }
      nav a {
        text-decoration: none;
        color: #555;
        font-weight: 500;
        transition: color 0.2s;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      nav a:hover,
      nav a.active {
        color: #007bff;
      }
      .badge {
        background-color: #dc3545;
        color: white;
        font-size: 0.75rem;
        padding: 2px 6px;
        border-radius: 10px;
        min-width: 18px;
        text-align: center;
      }
      main {
        flex: 1;
        background-color: #f5f5f5;
        padding: 20px 0;
      }
      footer {
        background-color: #333;
        color: #fff;
        text-align: center;
        padding: 20px;
        font-size: 0.9rem;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private cartService = inject(CartService);
  cartCount = this.cartService.cartCount;
}
