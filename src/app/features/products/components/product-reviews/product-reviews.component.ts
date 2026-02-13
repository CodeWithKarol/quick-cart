import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Product } from '../../models/product';

export interface ReviewBreakdownItem {
  label: string;
  value: number;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  avatar: string;
  content: string;
}

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  template: `
    <section aria-labelledby="reviews-heading" class="mt-16 border-t border-primary-200 pt-16">
      <h2 id="reviews-heading" class="text-2xl font-medium font-display tracking-tight text-primary-900">
        Customer Reviews
      </h2>

      <div class="mt-6 lg:grid lg:grid-cols-12 lg:gap-x-8">
        <!-- Review Summary & Breakdown -->
        <div class="lg:col-span-4">
          <div class="flex items-center">
            <div class="flex items-center">
              @for (star of stars; track star) {
                <svg
                  class="h-5 w-5 flex-shrink-0"
                  [class.text-primary-900]="(product().rating || 0) > star"
                  [class.text-primary-200]="(product().rating || 0) <= star"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clip-rule="evenodd"
                  />
                </svg>
              }
            </div>
            <p class="ml-2 text-sm text-primary-900">Based on {{ product().reviews }} reviews</p>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Review data</h3>
            <dl class="space-y-3">
              @for (item of reviewBreakdown(); track item.label) {
                <div class="flex items-center text-sm">
                  <dt class="flex-1 text-primary-500 font-light">{{ item.label }}</dt>
                  <dd class="ml-3 flex flex-1 items-center">
                    <div class="flex-1 rounded-full bg-secondary-200 h-2">
                      <div
                        class="h-2 rounded-full bg-primary-900"
                        [style.width.%]="item.value"
                      ></div>
                    </div>
                    <span class="ml-3 w-9 text-right text-primary-900">{{ item.value }}%</span>
                  </dd>
                </div>
              }
            </dl>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-primary-900 uppercase tracking-widest">Share your thoughts</h3>
            <p class="mt-1 text-sm text-primary-500 font-light">
              If you’ve used this product, share your thoughts with other customers.
            </p>
            <a
              href="#"
              class="mt-6 inline-flex w-full items-center justify-center border border-primary-200 bg-white px-8 py-2 text-sm font-bold uppercase tracking-widest text-primary-900 hover:bg-secondary-50 sm:w-auto lg:w-full transition-colors"
            >
              Write a review
            </a>
          </div>
        </div>

        <!-- Recent Reviews & Photos -->
        <div class="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 class="text-lg font-medium text-primary-900 font-display">Customer Photos</h3>
          <div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            @for (photo of customerPhotos(); track photo) {
              <img
                [src]="photo"
                alt="Customer photo"
                class="rounded-sm bg-secondary-100 object-cover h-24 w-full"
              />
            }
          </div>

          <div class="flow-root mt-10">
            <h3 class="text-lg font-medium text-primary-900 font-display">Recent Reviews</h3>
            <div class="mt-6 divide-y divide-primary-100">
              @for (review of reviews(); track review.id) {
                <div class="py-6">
                  <div class="flex items-center">
                    <img
                      [src]="review.avatar"
                      [alt]="review.author"
                      class="h-10 w-10 rounded-full object-cover ring-2 ring-white"
                    />
                    <div class="ml-4">
                      <h4 class="text-sm font-bold text-primary-900">{{ review.author }}</h4>
                      <div class="mt-1 flex items-center">
                        @for (star of stars; track star) {
                          <svg
                            class="h-4 w-4"
                            [class.text-primary-900]="review.rating > star"
                            [class.text-primary-200]="review.rating <= star"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.453 1.415 1.02L10 15.591l4.069 2.485c.724.442 1.609-.198 1.415-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.651l-4.752-.382-1.831-4.401z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        }
                      </div>
                    </div>
                  </div>

                  <div class="mt-4 space-y-6 text-sm text-primary-600 italic font-light">
                    <p>{{ review.content }}</p>
                  </div>
                  <p class="mt-2 text-xs text-primary-400 font-medium uppercase tracking-widest">Verified Purchase</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductReviews {
  product = input.required<Product>();
  reviewBreakdown = input.required<ReviewBreakdownItem[]>();
  customerPhotos = input.required<string[]>();
  reviews = input.required<Review[]>();

  readonly stars = [0, 1, 2, 3, 4];
}
