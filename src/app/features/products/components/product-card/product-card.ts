import { Component, input, output, inject, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { WishlistService } from '../../../../features/wishlist/services/wishlist-store';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  styles: [
    `
      :host {
        display: block;
        height: 100%;
      }
    `,
  ],
  template: `
    <div
      class="group relative h-full flex flex-col items-center text-center"
    >
      <button
        type="button"
        (click)="toggleWishlist($event)"
        class="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-primary-400 hover:text-accent-500 transition-colors shadow-sm"
        [class.text-accent-500]="isWishlisted()"
      >
        <span class="sr-only">Add to wishlist</span>
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path
            fill-rule="evenodd"
            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
            clip-rule="evenodd"
          />
        </svg>
      </button>

      <div
        [routerLink]="['/product', product().id]"
        class="relative aspect-[4/5] w-full overflow-hidden bg-secondary-100 cursor-pointer mb-6"
      >
        @if (priority()) {
          <img
            [ngSrc]="product().imageUrl"
            [alt]="product().name"
            fill
            priority
            class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 will-change-transform"
          />
        } @else {
          <img
            [ngSrc]="product().imageUrl"
            [alt]="product().name"
            fill
            class="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 will-change-transform"
          />
        }
        <button
          type="button"
          (click)="onQuickView($event)"
          class="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-primary-900 px-6 py-2 shadow-sm text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white z-20 translate-y-4 group-hover:translate-y-0"
        >
          Quick View
        </button>
      </div>

      <h3 class="text-lg font-medium text-primary-900 font-display">
        <a [routerLink]="['/product', product().id]">
          <span aria-hidden="true" class="absolute inset-0"></span>
          {{ product().name }}
        </a>
      </h3>

      <div class="mt-2 flex flex-col items-center">
        <div class="flex items-center space-x-0.5">
          @for (star of [0, 1, 2, 3, 4]; track star) {
            <svg
              class="h-3 w-3 flex-shrink-0"
              [class.text-primary-900]="product().rating! > star"
              [class.text-primary-200]="product().rating! <= star"
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
        <p class="mt-1 text-xs text-primary-400">{{ product().reviews }} reviews</p>
      </div>

      <p class="price mt-3 text-base font-light text-primary-600">{{ product().price | currency }}</p>

      <!-- Colors -->
      @if (product().colors && product().colors!.length > 0) {
        <div class="mt-4 flex items-center justify-center space-x-2">
          @for (color of product().colors; track color.name) {
            <span
              class="h-3 w-3 rounded-full border border-primary-100"
              [class]="color.class"
              [attr.aria-label]="color.name"
              [title]="color.name"
            ></span>
          }
        </div>
      }

      <button
        type="button"
        (click)="onAddToCart($event)"
        class="relative z-10 mt-4 w-full rounded-none bg-primary-900 px-3 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-sm hover:bg-primary-800 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
      >
        Add to bag
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCard {
  private wishlistService = inject(WishlistService);

  product = input.required<Product>();
  priority = input(false);
  addToCart = output<Product>();
  quickView = output<Product>();

  isWishlisted = computed(() => this.wishlistService.isInWishlist(this.product().id));

  toggleWishlist(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.wishlistService.toggle(this.product().id);
  }

  onAddToCart(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.addToCart.emit(this.product());
  }

  onQuickView(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.quickView.emit(this.product());
  }
}
