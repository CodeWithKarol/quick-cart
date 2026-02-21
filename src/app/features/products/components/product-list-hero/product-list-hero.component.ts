import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-product-list-hero',
  standalone: true,
  template: `
    <div class="relative bg-secondary-50 py-24 sm:py-32 border-b border-primary-50 overflow-hidden">
      <!-- Minimalist background texture -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <svg class="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.1" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div class="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 class="text-4xl font-display font-medium text-primary-900 sm:text-5xl mb-4">
          The Collection
        </h1>
        <p class="mx-auto max-w-2xl text-lg font-light text-primary-600 mb-12">
          Curated essentials for the modern home. Designed for style, engineered for life.
        </p>

        <!-- Minimalist Search Form -->
        <div class="mx-auto max-w-lg">
          <div class="relative group">
            <input
              type="text"
              [value]="searchQuery()"
              (input)="onSearchInput($event)"
              placeholder="Finding something intentional..."
              class="w-full bg-white/80 backdrop-blur-sm border border-primary-200 rounded-sm py-4 pl-6 pr-12 text-primary-900 placeholder:text-primary-300 focus:ring-0 focus:border-primary-900 transition-all duration-300 text-lg font-light italic"
            />
            <div
              class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-primary-300 group-focus-within:text-primary-900 transition-colors"
            >
              <svg
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListHero {
  searchQuery = input<string>('');
  searchChange = output<string>();

  onSearchInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchChange.emit(input.value);
  }
}
