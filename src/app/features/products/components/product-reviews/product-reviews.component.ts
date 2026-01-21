import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-product-reviews',
  standalone: true,
  template: `
    <section aria-labelledby="reviews-heading" class="mt-16 border-t border-gray-200 pt-16">
      <h2 id="reviews-heading" class="text-2xl font-bold tracking-tight text-gray-900">
        Customer Reviews
      </h2>

      <div class="mt-6 lg:grid lg:grid-cols-12 lg:gap-x-8">
        <!-- Review Summary & Breakdown -->
        <div class="lg:col-span-4">
          <div class="flex items-center">
            <div class="flex items-center">
              @for (star of [0, 1, 2, 3, 4]; track star) {
                <svg
                  class="h-5 w-5 flex-shrink-0"
                  [class.text-yellow-400]="(product().rating || 0) > star"
                  [class.text-gray-300]="(product().rating || 0) <= star"
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
            <p class="ml-2 text-sm text-gray-900">Based on {{ product().reviews }} reviews</p>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Review data</h3>
            <dl class="space-y-3">
              @for (item of reviewBreakdown(); track item.label) {
                <div class="flex items-center text-sm">
                  <dt class="flex-1 text-gray-500">{{ item.label }}</dt>
                  <dd class="ml-3 flex flex-1 items-center">
                    <div class="flex-1 rounded-full bg-gray-200 h-2">
                      <div
                        class="h-2 rounded-full bg-indigo-600"
                        [style.width.%]="item.value"
                      ></div>
                    </div>
                    <span class="ml-3 w-9 text-right text-gray-900">{{ item.value }}%</span>
                  </dd>
                </div>
              }
            </dl>
          </div>

          <div class="mt-10">
            <h3 class="text-sm font-medium text-gray-900">Share your thoughts</h3>
            <p class="mt-1 text-sm text-gray-600">
              If you’ve used this product, share your thoughts with other customers.
            </p>
            <a
              href="#"
              class="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
            >
              Write a review
            </a>
          </div>
        </div>

        <!-- Recent Reviews & Photos -->
        <div class="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
          <h3 class="text-lg font-medium text-gray-900">Customer Photos</h3>
          <div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
            @for (photo of customerPhotos(); track photo) {
              <img
                [src]="photo"
                alt="Customer photo"
                class="rounded-lg bg-gray-100 object-cover h-24 w-full"
              />
            }
          </div>

          <div class="flow-root mt-10">
            <h3 class="text-lg font-medium text-gray-900">Recent Reviews</h3>
            <div class="mt-6 divide-y divide-gray-200">
              @for (review of reviews(); track review.id) {
                <div class="py-6">
                  <div class="flex items-center">
                    <img
                      [src]="review.avatar"
                      [alt]="review.author"
                      class="h-10 w-10 rounded-full object-cover"
                    />
                    <div class="ml-4">
                      <h4 class="text-sm font-bold text-gray-900">{{ review.author }}</h4>
                      <div class="mt-1 flex items-center">
                        @for (star of [0, 1, 2, 3, 4]; track star) {
                          <svg
                            class="h-4 w-4"
                            [class.text-yellow-400]="review.rating > star"
                            [class.text-gray-300]="review.rating <= star"
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

                  <div class="mt-4 space-y-6 text-sm text-gray-600 italic">
                    <p>{{ review.content }}</p>
                  </div>
                  <p class="mt-2 text-xs text-gray-500 font-medium">Verified Purchase</p>
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
  product = input.required<any>(); // or Product
  reviewBreakdown = input.required<any[]>();
  customerPhotos = input.required<string[]>();
  reviews = input.required<any[]>();
}
