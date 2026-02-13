import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

export interface BreadcrumbItem {
  label: string;
  link?: string | (string | number)[];
  queryParams?: Record<string, string | number | boolean | undefined>;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [RouterLink, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav aria-label="Breadcrumb" class="pt-4 sm:pt-8">
      <ol
        role="list"
        class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
      >
        @for (item of items(); track item.label; let last = $last) {
          <li>
            <div class="flex items-center">
              @if (!last) {
                <a
                  [routerLink]="item.link"
                  [queryParams]="item.queryParams"
                  class="mr-2 text-xs font-bold uppercase tracking-widest text-primary-900 hover:text-primary-600 transition-colors"
                >
                  {{ item.label }}
                </a>
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  class="h-5 w-4 text-primary-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              } @else {
                <span class="text-xs font-bold uppercase tracking-widest text-primary-500" aria-current="page">
                  {{ item.label }}
                </span>
              }
            </div>
          </li>
        }
      </ol>
    </nav>
  `,
})
export class Breadcrumb {
  items = input.required<BreadcrumbItem[]>();
}
