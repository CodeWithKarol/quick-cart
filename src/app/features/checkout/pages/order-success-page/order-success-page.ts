import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="flex min-h-screen flex-col bg-white">
      <div class="flex flex-1 items-center justify-center p-6 sm:p-12">
        <div class="w-full max-w-lg text-center">
          <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              class="h-6 w-6 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h1 class="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Order placed successfully!
          </h1>
          <p class="mt-4 text-base text-gray-500">
            Thank you for your purchase. We've received your order and are getting it ready.
          </p>

          <div class="mt-8 border-t border-gray-200 py-8">
            <h2 class="text-base font-semibold text-gray-900">Order #80293</h2>
            <p class="mt-2 text-sm text-indigo-600 font-medium">Tracking link sent to email</p>
          </div>

          <div class="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <a
              routerLink="/"
              class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:py-4 md:text-lg md:px-10"
            >
              Continue Shopping
            </a>
            <a
              href="#"
              class="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:py-4 md:text-lg md:px-10"
            >
              Track Order
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class OrderSuccessPage {}
