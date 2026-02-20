import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../../../products/models/product';
import { ProductCard } from '../../../products/components/product-card/product-card';
import { WishlistProduct } from '../../models/wishlist-item';

@Component({
  selector: 'app-wishlist-grid',
  standalone: true,
  imports: [ProductCard],
  template: `
    <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
      @for (
        product of products();
        track product.id + (product.wishlistVariant || '');
        let i = $index
      ) {
        <app-product-card
          [product]="product"
          [priority]="i < 4"
          [selectedVariant]="product.wishlistVariant"
          (addToCart)="addToCart.emit(product)"
          (quickView)="quickView.emit($event)"
        ></app-product-card>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistGrid {
  products = input.required<WishlistProduct[]>();
  addToCart = output<WishlistProduct>();
  quickView = output<Product>();
}
