import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="flex-shrink-0">
      <div
        class="relative h-24 w-24 rounded-md border border-gray-200 overflow-hidden sm:h-48 sm:w-48"
      >
        <img
          [ngSrc]="item().product.imageUrl"
          [alt]="item().product.name"
          [priority]="priority()"
          fill
          class="h-full w-full object-cover object-center"
        />
      </div>
    </div>

    <div class="item-details ml-4 flex flex-1 flex-col justify-between sm:ml-6">
      <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
        <div>
          <div class="flex justify-between">
            <h3 class="text-sm">
              <a [routerLink]="[]" class="font-medium text-gray-700 hover:text-gray-800">
                {{ item().product.name }}
              </a>
            </h3>
          </div>
          <div class="mt-1 flex text-sm">
            <p class="text-gray-500">{{ item().product.category }}</p>
          </div>
          <p class="mt-1 text-sm font-medium text-gray-900">
            {{ item().product.price | currency }}
          </p>
        </div>

        <div class="mt-4 sm:mt-0 sm:pr-9">
          <label [for]="'quantity-' + item().product.id" class="sr-only">
            Quantity, {{ item().product.name }}
          </label>
          <div class="flex items-center border border-gray-300 rounded-md w-32">
            <button
              type="button"
              (click)="onQuantityUpdate(item().quantity - 1)"
              [disabled]="item().quantity <= 1"
              class="p-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span class="sr-only">Decrease quantity</span>
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4"
                />
              </svg>
            </button>
            <input
              [id]="'quantity-' + item().product.id"
              type="text"
              readonly
              [value]="item().quantity"
              class="w-full text-center border-none p-0 text-gray-900 focus:ring-0 sm:text-sm"
            />
            <button
              type="button"
              (click)="onQuantityUpdate(item().quantity + 1)"
              class="p-2 text-gray-600 hover:text-gray-900"
            >
              <span class="sr-only">Increase quantity</span>
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <div class="absolute top-0 right-0">
            <button
              type="button"
              (click)="onRemove()"
              class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
            >
              <span class="sr-only">Remove</span>
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <p class="mt-4 flex space-x-2 text-sm text-gray-700">
        <svg
          class="h-5 w-5 flex-shrink-0 text-green-500"
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
        <span>In stock</span>
      </p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartItemComponent {
  item = input.required<CartItem>();
  priority = input(false);
  quantityUpdate = output<number>();
  remove = output<void>();

  onQuantityUpdate(newQuantity: number) {
    this.quantityUpdate.emit(newQuantity);
  }

  onRemove() {
    this.remove.emit();
  }
}
