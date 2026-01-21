import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-list-hero',
  standalone: true,
  template: `
    <div class="relative bg-gray-900 border-b-4 border-indigo-600">
      <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
          alt=""
          class="h-full w-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gray-900/60"></div>
      </div>
      <div
        class="relative mx-auto max-w-3xl flex flex-col items-center px-6 py-32 text-center sm:py-48 lg:px-0"
      >
        <h1 class="text-4xl font-bold tracking-tight text-white sm:text-6xl">New Arrivals</h1>
        <p class="mt-4 text-xl text-gray-200">
          Check out our latest collection of premium products. Designed for style, engineered for
          performance.
        </p>
        <a
          href="#products-heading"
          class="mt-8 inline-block rounded-md border border-transparent bg-white px-8 py-3 text-base font-medium text-gray-900 hover:bg-gray-100 shadow-sm transform hover:scale-105 transition-all duration-200"
          >Shop Now</a
        >
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListHero {}
