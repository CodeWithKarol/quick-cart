import { Component, input, output, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Product } from '../../models/product';
import { CartService } from '../../../cart/services/cart-store';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-quick-view',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  template: `
    @if (isOpen()) {
      <div class="relative z-50" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div
          class="fixed inset-0 hidden bg-primary-950/40 backdrop-blur-sm transition-opacity md:block"
          (click)="closeModal.emit()"
          (keyup.enter)="closeModal.emit()"
          tabindex="0"
        ></div>

        <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div
            class="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4"
          >
            <div
              class="flex w-full transform text-left text-base transition md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl"
            >
              <div
                class="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 rounded-sm"
              >
                <button
                  type="button"
                  class="absolute right-4 top-4 text-primary-400 hover:text-primary-600 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8 transition-colors"
                  (click)="closeModal.emit()"
                >
                  <span class="sr-only">Close</span>
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                @if (product(); as p) {
                  <div
                    class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-12"
                  >
                    <!-- Image -->
                    <div
                      class="aspect-[4/5] overflow-hidden bg-secondary-50 sm:col-span-4 lg:col-span-5 relative h-full min-h-[400px]"
                    >
                      <img
                        [ngSrc]="p.imageUrl"
                        [alt]="p.name"
                        fill
                        priority
                        class="object-cover object-center"
                      />
                    </div>
                    
                    <!-- Content -->
                    <div class="sm:col-span-8 lg:col-span-7 flex flex-col h-full justify-center">
                      <h2 class="text-3xl font-medium font-display text-primary-900 sm:pr-12">{{ p.name }}</h2>

                      <section aria-labelledby="information-heading" class="mt-4">
                        <h3 id="information-heading" class="sr-only">Product information</h3>
                        <p class="text-xl text-primary-600 font-light">{{ p.price | currency }}</p>

                        <!-- Reviews (Simplified) -->
                        <div class="mt-4 flex items-center gap-1">
                           @for (star of [1,2,3,4,5]; track star) {
                             <svg class="h-4 w-4 text-secondary-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clip-rule="evenodd" />
                             </svg>
                           }
                           <span class="ml-2 text-xs text-primary-400 uppercase tracking-widest">{{ p.rating }} / 5</span>
                        </div>
                      </section>

                      <section aria-labelledby="options-heading" class="mt-8">
                        <div class="mt-4">
                          <h3 class="sr-only">Description</h3>
                          <p class="text-base text-primary-500 font-light leading-relaxed">{{ p.description }}</p>
                        </div>

                        <div class="mt-10 flex flex-col sm:flex-row gap-4">
                          <button
                            type="button"
                            (click)="addToCart(p)"
                            class="flex w-full items-center justify-center border border-transparent bg-primary-900 px-8 py-3 text-sm font-bold uppercase tracking-widest text-white hover:bg-primary-800 focus:outline-none transition-colors"
                          >
                            Add to bag
                          </button>
                          <a
                            [routerLink]="['/product', p.id]"
                            class="flex w-full items-center justify-center border border-primary-200 bg-white px-8 py-3 text-sm font-bold uppercase tracking-widest text-primary-900 hover:bg-secondary-50 focus:outline-none transition-colors"
                          >
                            View Details
                          </a>
                        </div>
                      </section>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    }
  `,
})
export class QuickViewComponent {
  product = input<Product>();
  isOpen = input(false);
  closeModal = output();

  cartService = inject(CartService);

  addToCart(p: Product) {
    this.cartService.addToCart(p);
    this.closeModal.emit();
  }
}
