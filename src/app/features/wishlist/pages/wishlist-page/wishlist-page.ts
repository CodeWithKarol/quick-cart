import {
  Component,
  inject,
  computed,
  signal,
  ChangeDetectionStrategy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../products/models/product';
import { ProductService } from '../../../products/services/product-api';
import { WishlistService } from '../../services/wishlist-store';
import { CartService } from '../../../cart/services/cart-store';
import { ToastService } from '../../../../shared/services/toast-service';
import { QuickViewComponent } from '../../../products/components/quick-view/quick-view-dialog';
import { toSignal } from '@angular/core/rxjs-interop';
import { WishlistEmptyState } from '../../components/wishlist-empty-state/wishlist-empty-state.component';
import { WishlistGrid } from '../../components/wishlist-grid/wishlist-grid.component';
import { WishlistProduct } from '../../models/wishlist-item';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [QuickViewComponent, WishlistEmptyState, WishlistGrid],
  templateUrl: './wishlist-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishlistPage implements OnInit {
  private productService = inject(ProductService);
  private wishlistService = inject(WishlistService);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    const boardParam = this.route.snapshot.queryParamMap.get('board');
    if (boardParam) {
      this.selectedCollection.set(boardParam);
    }
  }

  // We need to react to changes in the wishlist
  wishlist = this.wishlistService.wishlist;
  collections = this.wishlistService.collections;
  selectedCollection = signal('All');

  // We'll signal to fetch products when component inits or IDs change
  allProducts = toSignal(this.productService.getProducts(), { initialValue: [] });

  // Computed property to filter products that are in the wishlist and match the selected collection
  wishlistItems = computed(() => {
    const products = this.allProducts();
    const rawWishlist = this.wishlist();
    const activeCollection = this.selectedCollection();

    // Filter by collection if not 'All'
    const filteredWishlist =
      activeCollection === 'All'
        ? rawWishlist
        : rawWishlist.filter((item) => item.collection === activeCollection);

    // Map to products, ensuring we preserve the variant info
    return filteredWishlist
      .map((item) => {
        const product = products.find((p) => p.id === item.productId);
        if (!product) return null;
        return {
          ...product,
          wishlistVariant: item.variant,
          wishlistCollection: item.collection,
        } as WishlistProduct;
      })
      .filter((p): p is WishlistProduct => p !== null);
  });

  selectedQuickViewProduct = signal<Product | undefined>(undefined);

  onAddToCart(product: WishlistProduct) {
    this.cartService.addToCart(product, product.wishlistVariant);
  }

  onQuickView(product: Product) {
    this.selectedQuickViewProduct.set(product);
  }

  closeQuickView() {
    this.selectedQuickViewProduct.set(undefined);
  }

  setCollection(name: string) {
    this.selectedCollection.set(name);
  }

  shareCollection() {
    const currentBoard = this.selectedCollection();
    // In a real app, this would be a hash or a specific shareable URL
    const url = `${window.location.origin}/wishlist?board=${encodeURIComponent(currentBoard)}`;
    navigator.clipboard.writeText(url).then(() => {
      this.toastService.success(`Share link copied for "${currentBoard}" board.`);
    });
  }
}
