import { ChangeDetectionStrategy, Component, input, output, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageZoomDirective } from '../../../../shared/directives/image-zoom.directive';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-gallery',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, ImageZoomDirective],
  template: `
    <div class="flex flex-col-reverse">
      <div class="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
        <div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
          @for (image of galleryImages(); track $index) {
            <button
              class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
              [class.ring-indigo-500]="selectedImage() === image"
              (click)="selectedImageChange.emit(image)"
              type="button"
              role="tab"
            >
              <span class="sr-only">Image view</span>
              <span class="absolute inset-0 overflow-hidden rounded-md">
                <img [src]="image" alt="" class="h-full w-full object-cover object-center" />
              </span>
              <span
                class="pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                [class.ring-indigo-500]="selectedImage() === image"
                [class.ring-transparent]="selectedImage() !== image"
                aria-hidden="true"
              ></span>
            </button>
          }
        </div>
      </div>

      <div
        class="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 sm:aspect-[2/3]"
        [appImageZoom]="2"
      >
        <img
          [ngSrc]="selectedImage() || product().imageUrl"
          [alt]="product().name"
          fill
          priority
          class="h-full w-full object-cover object-center sm:rounded-lg"
        />
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGallery {
  product = input.required<Product>();
  selectedImage = input.required<string>();
  selectedImageChange = output<string>();

  galleryImages = computed(() => {
    const product = this.product();
    return product.images && product.images.length > 0 ? product.images : [product.imageUrl];
  });
}
