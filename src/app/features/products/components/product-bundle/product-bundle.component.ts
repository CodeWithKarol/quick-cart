import { ChangeDetectionStrategy, Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-bundle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="mt-16 bg-secondary-50/50 border-y border-primary-50 px-4 py-12 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-center">
          <!-- Editorial Intro -->
          <div class="lg:col-span-4 mb-10 lg:mb-0">
            <h2 class="text-3xl font-display font-medium text-primary-900 mb-4">
              Complete the Look
            </h2>
            <p class="text-primary-600 font-light italic mb-8">
              A curated selection of essentials designed to work in harmony. Bring intentionality to
              your space with this prepared ensemble.
            </p>
            <div class="flex items-center justify-between border-t border-primary-100 pt-6">
              <div>
                <p class="text-[10px] font-bold uppercase tracking-widest text-primary-400 mb-1">
                  Bundle Total
                </p>
                <p class="text-2xl font-light text-primary-900">
                  {{ totalBundlePrice() | currency }}
                </p>
              </div>
              <button
                (click)="addAllToCart.emit(products())"
                class="bg-primary-900 text-white px-8 py-3 text-xs font-bold uppercase tracking-widest hover:bg-primary-800 transition-colors"
              >
                Add All to Cart
              </button>
            </div>
          </div>

          <!-- Bundle Items -->
          <div class="lg:col-span-8">
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-6">
              @for (item of products(); track item.id) {
                <div
                  class="group relative bg-white border border-primary-50 p-4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div class="aspect-square overflow-hidden mb-4 bg-secondary-50">
                    <img
                      [src]="item.imageUrl"
                      [alt]="item.name"
                      class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <h3 class="text-xs font-bold text-primary-900 uppercase tracking-widest truncate">
                    {{ item.name }}
                  </h3>
                  <p class="text-xs text-primary-500 font-light mt-1">
                    {{ item.price | currency }}
                  </p>
                  <a [href]="'/product/' + item.id" class="absolute inset-0">
                    <span class="sr-only">View {{ item.name }}</span>
                  </a>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductBundle {
  products = input.required<Product[]>();
  addAllToCart = output<Product[]>();

  totalBundlePrice = computed(() => {
    return this.products().reduce((acc, p) => acc + p.price, 0);
  });
}
