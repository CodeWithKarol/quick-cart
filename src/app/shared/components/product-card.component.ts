import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div
      class="group relative flex flex-col h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      <div class="relative aspect-square overflow-hidden bg-gray-100">
        @if (priority()) {
        <img
          [ngSrc]="product().imageUrl"
          [alt]="product().name"
          fill
          priority
          class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        } @else {
        <img
          [ngSrc]="product().imageUrl"
          [alt]="product().name"
          fill
          class="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />
        }
      </div>
      <div class="flex flex-1 flex-col p-5">
        <div class="flex justify-between items-start mb-2">
          <div>
            <p class="text-xs font-medium text-indigo-600 mb-1 uppercase tracking-wide">
              {{ product().category }}
            </p>
            <h3 class="text-lg font-semibold text-gray-900 line-clamp-1" [title]="product().name">
              {{ product().name }}
            </h3>
          </div>
          <p class="text-lg font-bold text-gray-900 ml-2">{{ product().price | currency }}</p>
        </div>

        <p class="text-sm text-gray-500 line-clamp-2 flex-1 mb-4">
          {{ product().description }}
        </p>

        <button
          (click)="onAddToCart()"
          class="mt-auto flex w-full items-center justify-center rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 active:scale-95 cursor-pointer"
        >
          Add to Cart
        </button>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<Product>();
  priority = input(false);
  addToCart = output<Product>();

  onAddToCart() {
    this.addToCart.emit(this.product());
  }
}
