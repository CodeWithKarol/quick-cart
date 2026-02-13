import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-primary-950 border-t border-primary-900 mt-auto">
      <!-- Minimalist Trust Indicators -->
      <div class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 border-b border-primary-900">
        <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-3 sm:gap-x-8 text-center">
          <div class="flex items-center justify-center gap-3">
             <span class="text-primary-300 uppercase tracking-widest text-xs font-bold">Free Shipping over $100</span>
          </div>
          <div class="flex items-center justify-center gap-3">
             <span class="text-primary-300 uppercase tracking-widest text-xs font-bold">10-Year Warranty</span>
          </div>
           <div class="flex items-center justify-center gap-3">
             <span class="text-primary-300 uppercase tracking-widest text-xs font-bold">Hassle-free Exchanges</span>
          </div>
        </div>
      </div>

      <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-primary-950 text-white">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 class="text-lg font-display font-medium leading-6 text-white mb-6">Shop</h3>
            <ul role="list" class="space-y-4">
              <li>
                <a routerLink="/shop" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors"
                  >New Arrivals</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors"
                  >Best Sellers</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors"
                  >Accessories</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors">Sale</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-display font-medium leading-6 text-white mb-6">Company</h3>
            <ul role="list" class="space-y-4">
              <li>
                <a href="#" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors"
                  >Sustainability</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors">Careers</a>
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors"
                  >Terms & Conditions</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-display font-medium leading-6 text-white mb-6">Account</h3>
            <ul role="list" class="space-y-4">
              <li>
                <a href="#" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors"
                  >Manage Account</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors"
                  >Returns & Exchanges</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors"
                  >Redeem a Gift Card</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-lg font-display font-medium leading-6 text-white mb-6">Connect</h3>
            <ul role="list" class="space-y-4">
              <li>
                <a href="#" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors"
                  >Contact Us</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors">Twitter</a>
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors"
                  >Instagram</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-primary-300 hover:text-white transition-colors"
                  >Pinterest</a
                >
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-16 border-t border-primary-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
           <p class="text-left text-xs leading-5 text-primary-500">
            &copy; 2026 QuickCart, Inc. All rights reserved.
          </p>
          <div class="flex gap-4">
             <span class="text-primary-600 text-xs uppercase tracking-widest">Designed for Luxury</span>
          </div>
        </div>
      </div>
    </footer>
  `,
})
export class Footer {}
