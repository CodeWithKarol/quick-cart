import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cart-drawer-empty',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li class="py-12 text-center flex flex-col items-center">
      <svg
        class="h-10 w-10 text-primary-200 mb-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <p class="text-primary-500 font-light">Your cart is empty</p>
    </li>
  `,
})
export class CartDrawerEmptyComponent {}
