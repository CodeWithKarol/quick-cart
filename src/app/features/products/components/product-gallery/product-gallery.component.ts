import { ChangeDetectionStrategy, Component, input, output, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ImageZoomDirective } from '../../../../shared/directives/image-zoom';
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
              class="relative flex h-24 cursor-pointer items-center justify-center bg-secondary-50 text-sm font-medium uppercase text-primary-900 hover:bg-secondary-100 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
              [class.ring-primary-900]="selectedImage() === image"
              (click)="selectedImageChange.emit(image)"
              type="button"
              role="tab"
            >
              <span class="sr-only">Image view</span>
              <span class="absolute inset-0 overflow-hidden">
                <img [src]="image" alt="" class="h-full w-full object-cover object-center" />
              </span>
              <span
                class="pointer-events-none absolute inset-0 ring-2 ring-offset-2"
                [class.ring-primary-900]="selectedImage() === image"
                [class.ring-transparent]="selectedImage() !== image"
                aria-hidden="true"
              ></span>
            </button>
          }
        </div>
      </div>

      <div
        class="relative aspect-square w-full overflow-hidden bg-secondary-50 sm:aspect-[4/5]"
        [appImageZoom]="2"
      >
        <img
          [ngSrc]="selectedImage() || product().imageUrl"
          [alt]="product().name"
          fill
          priority
          class="h-full w-full object-cover object-center"
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
