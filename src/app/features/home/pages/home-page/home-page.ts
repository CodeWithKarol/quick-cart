import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService } from '../../../products/services/product.service';
import { CartService } from '../../../cart/services/cart.service';
import { QuickViewComponent } from '../../../products/components/quick-view/quick-view.component';
import { map } from 'rxjs/operators';
import { Product } from '../../../products/models/product';
import { HomeHeroComponent } from '../../components/home-hero/home-hero.component';
import { HomeFeaturesComponent } from '../../components/home-features/home-features.component';
import { HomeFeaturedProductsComponent } from '../../components/home-featured-products/home-featured-products.component';
import { HomeNewsletterComponent } from '../../components/home-newsletter/home-newsletter.component';

@Component({
  selector: 'app-home-page',
  imports: [
    CommonModule,
    QuickViewComponent,
    HomeHeroComponent,
    HomeFeaturesComponent,
    HomeFeaturedProductsComponent,
    HomeNewsletterComponent,
  ],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  // Get first 4 products for trending, using toSignal to unwrap the Observable
  featuredProducts = toSignal(
    this.productService.getProducts().pipe(map((products) => products.slice(0, 4))),
    { initialValue: [] },
  );

  selectedQuickViewProduct = signal<Product | undefined>(undefined);

  onAddToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  onQuickView(product: Product) {
    this.selectedQuickViewProduct.set(product);
  }

  closeQuickView() {
    this.selectedQuickViewProduct.set(undefined);
  }
}
