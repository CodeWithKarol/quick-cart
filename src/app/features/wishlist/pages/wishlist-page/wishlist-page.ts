import { Component, inject, computed, signal, ChangeDetectionStrategy } from '@angular/core';
import { Product } from '../../../products/models/product';
import { ProductService } from '../../../products/services/product.service';
import { WishlistService } from '../../services/wishlist.service';
import { CartService } from '../../../cart/services/cart.service';
import { QuickViewComponent } from '../../../products/components/quick-view/quick-view.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { WishlistEmptyState } from '../../components/wishlist-empty-state/wishlist-empty-state.component';
import { WishlistGrid } from '../../components/wishlist-grid/wishlist-grid.component';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [QuickViewComponent, WishlistEmptyState, WishlistGrid],
  templateUrl: './wishlist-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistPage {
  private productService = inject(ProductService);
  private wishlistService = inject(WishlistService);
  private cartService = inject(CartService);

  // We need to react to changes in the wishlist
  wishlistIds = this.wishlistService.wishlist;

  // We'll signal to fetch products when component inits or IDs change
  allProducts = toSignal(this.productService.getProducts(), { initialValue: [] });

  // Computed property to filter products that are in the wishlist
  wishlistItems = computed(() => {
    const products = this.allProducts();
    const ids = this.wishlistIds();
    return products.filter((p) => ids.includes(p.id));
  });

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
