import { Component, inject, computed, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../products/services/product-api';
import { RecentlyViewedService } from '../../../products/services/recently-viewed-store';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { Product } from '../../../products/models/product';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home-recently-viewed',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './home-recently-viewed.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeRecentlyViewedComponent {
  private productService = inject(ProductService);
  private recentlyViewedService = inject(RecentlyViewedService);

  addToCart = output<Product>();
  quickView = output<Product>();

  // Get full product objects for the recently viewed IDs
  products = toSignal(
    this.productService.getProductsByIds(this.recentlyViewedService.recentlyViewedIds()),
    { initialValue: [] },
  );

  hasItems = computed(() => this.products().length > 0);
}
