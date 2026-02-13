import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-list-hero',
  standalone: true,
  template: `
    <div class="relative bg-secondary-50 py-24 sm:py-32 border-b border-primary-50">
      <div class="mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-display font-medium text-primary-900 sm:text-5xl mb-4">The Collection</h1>
        <p class="mx-auto max-w-2xl text-lg font-light text-primary-600">
          Curated essentials for the modern home. Designed for style, engineered for life.
        </p>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListHero {}
