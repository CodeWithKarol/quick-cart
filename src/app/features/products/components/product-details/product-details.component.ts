import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
      <h1 class="text-3xl font-medium font-display tracking-tight text-primary-900">{{ product().name }}</h1>

      <div class="mt-4">
        <h2 class="sr-only">Product information</h2>
        <p class="text-3xl tracking-tight text-primary-900 font-light">
          {{ product().price | currency }}
        </p>
      </div>

      <!-- Reviews -->
      <div class="mt-6">
        <h3 class="sr-only">Reviews</h3>
        <div class="flex items-center">
          <div class="flex items-center">
            @for (star of stars; track star) {
              <svg
                class="h-5 w-5 text-secondary-400 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clip-rule="evenodd"
                />
              </svg>
            }
          </div>
          <p class="sr-only">5 out of 5 stars</p>
        </div>
      </div>

      <!-- Colors -->
      @if (product().colors && product().colors!.length > 0) {
        <div class="mt-10">
          <h3 class="text-sm font-medium text-primary-900 uppercase tracking-widest">Color</h3>
          <div class="mt-4 flex items-center space-x-3">
            @for (color of product().colors; track color.name) {
              <button
                type="button"
                class="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-2 focus:ring focus:ring-offset-1"
                [class.ring-offset-1]="selectedColor() === color.name"
                [class]="selectedColor() === color.name ? 'ring-primary-900 ' + color.selectedClass : 'ring-transparent'"
                (click)="selectedColorChange.emit(color.name)"
                [title]="color.name"
                [attr.aria-label]="color.name"
              >
                <span class="sr-only">{{ color.name }}</span>
                <span
                  aria-hidden="true"
                  class="h-8 w-8 rounded-full border border-black border-opacity-10"
                  [class]="color.class"
                ></span>
              </button>
            }
          </div>
        </div>
      }

      <div class="mt-10">
        <h3 class="sr-only">Description</h3>
        <div class="space-y-6 text-base text-primary-600 font-light">
          <p>{{ product().description }}</p>
        </div>
      </div>

      <div class="mt-8">
        <div class="flex items-center">
          <svg
            class="h-5 w-5 flex-shrink-0 text-emerald-500"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clip-rule="evenodd"
            />
          </svg>
          <p class="ml-2 text-sm text-primary-500">In stock and ready to ship</p>
        </div>
      </div>

      <div class="mt-10 flex gap-4">
        <button
          type="button"
          (click)="addToCart.emit(product())"
          class="flex max-w-xs flex-1 items-center justify-center border border-transparent bg-primary-900 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-900 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full transition-colors"
        >
          Add to cart
        </button>

        <button
          type="button"
          (click)="toggleWishlist.emit(product())"
          class="flex items-center justify-center border border-primary-200 bg-white px-8 py-3 text-base font-medium text-primary-700 hover:bg-secondary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-gray-50 transition-colors"
          [class.text-accent-500]="isWishlisted()"
        >
          <span class="sr-only">Add to wishlist</span>
          <svg
            class="h-6 w-6 flex-shrink-0"
            [class.fill-current]="isWishlisted()"
            viewBox="0 0 20 20"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            />
          </svg>
        </button>
      </div>

      <div class="mt-10 border-t border-gray-200 pt-10">
        <h3 class="text-sm font-medium text-gray-900">Highlights</h3>
        <div class="mt-4 prose prose-sm text-gray-500">
          <ul role="list">
            <li>Durable and long-lasting material</li>
            <li>Designed for comfort and style</li>
            <li>Premium finish and attention to detail</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetails {
  product = input.required<Product>();
  selectedColor = input<string | null>(null);
  selectedColorChange = output<string>();
  isWishlisted = input(false);
  addToCart = output<Product>();
  toggleWishlist = output<Product>();

  readonly stars = [0, 1, 2, 3, 4];
}
