import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  template: `
    <div
      class="group relative p-4 sm:p-6 h-full flex flex-col items-center text-center hover:bg-gray-50 transition-colors"
    >
      <div
        [routerLink]="['/product', product().id]"
        class="relative aspect-square w-3/4 overflow-hidden rounded-lg bg-gray-100 cursor-pointer mb-6"
      >
        @if (priority()) {
        <img
          [ngSrc]="product().imageUrl"
          [alt]="product().name"
          fill
          priority
          class="h-full w-full object-cover object-center group-hover:opacity-75"
        />
        } @else {
        <img
          [ngSrc]="product().imageUrl"
          [alt]="product().name"
          fill
          class="h-full w-full object-cover object-center group-hover:opacity-75"
        />
        }
      </div>

      <h3 class="text-sm font-medium text-gray-900">
        <a [routerLink]="['/product', product().id]">
          <span aria-hidden="true" class="absolute inset-0"></span>
          {{ product().name }}
        </a>
      </h3>

      <div class="mt-3 flex flex-col items-center">
        <div class="flex items-center">
          @for (star of [0, 1, 2, 3, 4]; track star) {
          <svg
            class="h-4 w-4 flex-shrink-0"
            [class.text-yellow-400]="product().rating! > star"
            [class.text-gray-200]="product().rating! <= star"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.453 1.415 1.02L10 15.591l4.069 2.485c.724.442 1.609-.198 1.415-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.651l-4.752-.382-1.831-4.401z"
              clip-rule="evenodd"
            />
          </svg>
          }
        </div>
        <p class="mt-1 text-sm text-gray-500">{{ product().reviews }} reviews</p>
      </div>

      <p class="price mt-4 text-sm font-medium text-gray-900">{{ product().price | currency }}</p>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  product = input.required<Product>();
  priority = input(false);
  addToCart = output<Product>();

  onAddToCart() {
    this.addToCart.emit(this.product());
  }
}
