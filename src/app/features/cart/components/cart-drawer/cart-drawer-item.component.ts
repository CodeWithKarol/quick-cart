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
          <p class="text-primary-500 font-light">Qty {{ item().quantity }}</p>

          <div class="flex">
            <button
              type="button"
              (click)="onRemove()"
              class="font-medium text-primary-900 hover:text-accent-600 transition-colors text-xs uppercase tracking-widest"
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
  remove = output<void>();
  navigate = output<void>();

  onRemove() {
    this.remove.emit();
  }

  onNavigate() {
    this.navigate.emit();
  }
}
