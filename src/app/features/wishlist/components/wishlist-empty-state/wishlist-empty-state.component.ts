import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist-empty-state',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="text-center py-24">
      <svg
        class="mx-auto h-16 w-16 text-primary-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1"
        aria-hidden="true"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
      <h3 class="mt-4 text-lg font-medium font-display text-primary-900">Your wishlist is empty</h3>
      <p class="mt-2 text-sm text-primary-500 font-light">
        Start saving your favorite items to build your collection.
      </p>
      <div class="mt-8">
        <a
          routerLink="/"
          class="inline-flex items-center border-b border-primary-900 pb-1 text-xs font-bold uppercase tracking-widest text-primary-900 hover:text-primary-600 hover:border-primary-600 transition-colors"
        >
          Browse Products
        </a>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistEmptyState {}
