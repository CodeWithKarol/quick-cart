import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-white border-t border-gray-200 mt-auto">
      <!-- Trust Badges / Incentives -->
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
          <!-- Badge 1 -->
          <div class="text-center sm:flex sm:text-left lg:block lg:text-center">
            <div class="sm:flex-shrink-0">
              <div class="flow-root">
                <svg
                  class="mx-auto h-16 w-16 text-indigo-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                  />
                </svg>
              </div>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
              <h3 class="text-base font-medium text-gray-900">Free Shipping</h3>
              <p class="mt-2 text-sm text-gray-500">On all orders over $100. It's on us.</p>
            </div>
          </div>

          <!-- Badge 2 -->
          <div class="text-center sm:flex sm:text-left lg:block lg:text-center">
            <div class="sm:flex-shrink-0">
              <div class="flow-root">
                <svg
                  class="mx-auto h-16 w-16 text-indigo-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
                  />
                </svg>
              </div>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
              <h3 class="text-base font-medium text-gray-900">10-Year Warranty</h3>
              <p class="mt-2 text-sm text-gray-500">If it breaks, we replace it. Information...</p>
            </div>
          </div>

          <!-- Badge 3 -->
          <div class="text-center sm:flex sm:text-left lg:block lg:text-center">
            <div class="sm:flex-shrink-0">
              <div class="flow-root">
                <svg
                  class="mx-auto h-16 w-16 text-indigo-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </div>
            </div>
            <div class="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
              <h3 class="text-base font-medium text-gray-900">Easy Exchanges</h3>
              <p class="mt-2 text-sm text-gray-500">Didn't fit? Send it back to us.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 border-t border-gray-100 bg-gray-50">
        <div class="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 class="text-sm font-semibold leading-6 text-gray-900">Shop</h3>
            <ul role="list" class="mt-6 space-y-4">
              <li>
                <a routerLink="/shop" class="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >New Arrivals</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >Best Sellers</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >Accessories</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900">Sale</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold leading-6 text-gray-900">Company</h3>
            <ul role="list" class="mt-6 space-y-4">
              <li>
                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900">About Us</a>
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >Sustainability</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900">Careers</a>
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >Terms & Conditions</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold leading-6 text-gray-900">Account</h3>
            <ul role="list" class="mt-6 space-y-4">
              <li>
                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >Manage Account</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >Returns & Exchanges</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >Redeem a Gift Card</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h3 class="text-sm font-semibold leading-6 text-gray-900">Connect</h3>
            <ul role="list" class="mt-6 space-y-4">
              <li>
                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >Contact Us</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900">Twitter</a>
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >Instagram</a
                >
              </li>
              <li>
                <a href="#" class="text-sm leading-6 text-gray-600 hover:text-gray-900"
                  >Pinterest</a
                >
              </li>
            </ul>
          </div>
        </div>
        <p class="mt-10 border-t border-gray-200 pt-8 text-center text-xs leading-5 text-gray-500">
          &copy; 2026 QuickCart, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  `,
})
export class Footer {}
