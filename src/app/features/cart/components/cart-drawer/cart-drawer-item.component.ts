import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartItem } from '../../models/cart-item';

@Component({
  selector: 'app-cart-drawer-item',
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li class="flex py-6">
      <div
        class="relative h-24 w-24 flex-shrink-0 overflow-hidden border border-primary-100 bg-secondary-50"
      >
        <img
          [src]="item().product.imageUrl"
          [alt]="item().product.name"
          class="h-full w-full object-cover object-center"
        />
      </div>

      <div class="ml-4 flex flex-1 flex-col">
        <div>
          <div class="flex justify-between text-base font-medium text-primary-900">
            <h3>
              <a
                [routerLink]="['/product', item().product.id]"
                (click)="onNavigate()"
                class="font-display hover:text-primary-600 transition-colors"
              >
                {{ item().product.name }}
              </a>
            </h3>
            <p class="ml-4 font-light">{{ item().product.price | currency }}</p>
          </div>
          <p class="mt-1 text-sm text-primary-500 font-light">
            {{ item().product.category }}
            @if (item().variant) {
              <span class="ml-2 text-xs text-primary-400">Variant: {{ item().variant }}</span>
            }
          </p>
        </div>
        <div class="flex flex-1 items-end justify-between text-sm">
          <div class="flex items-center border border-primary-200 rounded-md bg-white">
            <button
              type="button"
              (click)="onUpdateQuantity(item().quantity - 1)"
              [disabled]="item().quantity <= 1"
              class="p-1 px-2 text-primary-400 hover:text-primary-900 disabled:opacity-30 transition-colors"
            >
              <span class="sr-only">Decrease quantity</span>
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span class="px-1 text-xs font-medium text-primary-900 min-w-[24px] text-center">
              {{ item().quantity }}
            </span>
            <button
              type="button"
              (click)="onUpdateQuantity(item().quantity + 1)"
              class="p-1 px-2 text-primary-400 hover:text-primary-900 transition-colors"
            >
              <span class="sr-only">Increase quantity</span>
              <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>
          </div>

          <div class="flex space-x-4">
            <button
              type="button"
              (click)="onSaveForLater()"
              class="font-medium text-primary-500 hover:text-primary-900 transition-colors text-[10px] uppercase tracking-wider"
            >
              Save for later
            </button>
            <button
              type="button"
              (click)="onRemove()"
              class="font-medium text-primary-900 hover:text-accent-600 transition-colors text-[10px] uppercase tracking-wider"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  `,
})
export class CartDrawerItemComponent {
  item = input.required<CartItem>();
  priority = input<boolean>(false);
  quantityChange = output<number>();
  saveForLater = output<void>();
  remove = output<void>();
  navigate = output<void>();

  onUpdateQuantity(newQuantity: number) {
    this.quantityChange.emit(newQuantity);
  }

  onSaveForLater() {
    this.saveForLater.emit();
  }

  onRemove() {
    this.remove.emit();
  }

  onNavigate() {
    this.navigate.emit();
  }
}
