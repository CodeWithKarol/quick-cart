import {
  Component,
  OnInit,
  inject,
  signal,
  computed,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../../cart/services/cart.service';
import { WishlistService } from '../../../../features/wishlist/services/wishlist.service';
import { RecentlyViewedService } from '../../services/recently-viewed.service';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { QuickViewComponent } from '../../components/quick-view/quick-view.component';
import { ProductGallery } from '../../components/product-gallery/product-gallery.component';
import { ProductDetails } from '../../components/product-details/product-details.component';
import { ProductReviews } from '../../components/product-reviews/product-reviews.component';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProductCard,
    QuickViewComponent,
    ProductGallery,
    ProductDetails,
    ProductReviews,
  ],
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        flex: 1;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-white flex-1 flex flex-col">
      <nav aria-label="Breadcrumb" class="pt-4 sm:pt-8">
        <ol
          role="list"
          class="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
        >
          <li>
            <div class="flex items-center">
              <a routerLink="/" class="mr-2 text-sm font-medium text-gray-900">Home</a>
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="currentColor"
                aria-hidden="true"
                class="h-5 w-4 text-gray-300"
              >
                <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
              </svg>
            </div>
          </li>
          @if (product(); as p) {
            <li>
              <div class="flex items-center">
                <a
                  routerLink="/"
                  [queryParams]="{ category: p.category }"
                  class="mr-2 text-sm font-medium text-gray-900"
                >
                  {{ p.category }}
                </a>
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  class="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li class="text-sm">
              <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">
                {{ p.name }}
              </a>
            </li>
          }
        </ol>
      </nav>

      <div class="pt-6 pb-16 sm:pb-24">
        @if (product(); as product) {
          <div class="mx-auto mt-8 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
              <!-- Image gallery -->
              <app-product-gallery
                [product]="product"
                [selectedImage]="selectedImage()"
                (selectedImageChange)="selectedImage.set($event)"
              />

              <!-- Product info -->
              <app-product-details
                [product]="product"
                [selectedColor]="selectedColor()"
                [isWishlisted]="isWishlisted()"
                (selectedColorChange)="selectedColor.set($event)"
                (addToCart)="addToCart($event)"
                (toggleWishlist)="toggleWishlist($event)"
              />
            </div>

            <!-- Reviews Section -->
            <app-product-reviews
              [product]="product"
              [reviewBreakdown]="reviewBreakdown"
              [customerPhotos]="mockCustomerPhotos"
              [reviews]="mockReviews"
            />

            @if (relatedProducts().length > 0) {
              <div class="mt-16 border-t border-gray-200 pt-16">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">
                  Customers also purchased
                </h2>
                <div
                  class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
                >
                  @for (related of relatedProducts(); track related.id; let i = $index) {
                    <app-product-card
                      [product]="related"
                      [priority]="i < 2"
                      (addToCart)="addToCart($event)"
                      (quickView)="onQuickView($event)"
                    ></app-product-card>
                  }
                </div>
              </div>
            }

            @if (recentlyViewedProducts().length > 0) {
              <div class="mt-16 border-t border-gray-200 pt-16">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">Recently Viewed</h2>
                <div
                  class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
                >
                  @for (recent of recentlyViewedProducts(); track recent.id; let i = $index) {
                    <app-product-card
                      [product]="recent"
                      [priority]="i < 2"
                      (addToCart)="addToCart($event)"
                      (quickView)="onQuickView($event)"
                    ></app-product-card>
                  }
                </div>
              </div>
            }
          </div>
        } @else {
          <div class="flex justify-center items-center h-96">
            <p class="text-gray-500">Product not found.</p>
          </div>
        }
      </div>

      <!-- Sticky Mobile CTA -->
      @if (product(); as product) {
        <div
          class="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 p-4 sm:hidden shadow-lg"
        >
          <div class="flex items-center justify-between gap-4">
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900 truncate">{{ product.name }}</p>
              <p class="text-sm text-gray-500">{{ product.price | currency }}</p>
            </div>
            <button
              type="button"
              (click)="addToCart(product)"
              class="flex-shrink-0 bg-indigo-600 border border-transparent rounded-md py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Add to Cart
            </button>
          </div>
        </div>
      }

      <app-quick-view
        [product]="selectedQuickViewProduct()"
        [isOpen]="!!selectedQuickViewProduct()"
        (closeModal)="closeQuickView()"
      ></app-quick-view>
    </div>
  `,
})
export class ProductOverviewPage implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private recentlyViewedService = inject(RecentlyViewedService);

  product = signal<Product | undefined>(undefined);
  relatedProducts = signal<Product[]>([]);
  recentlyViewedProducts = signal<Product[]>([]);
  selectedImage = signal<string>('');
  selectedColor = signal<string | null>(null);
  selectedQuickViewProduct = signal<Product | undefined>(undefined);

  // Mock Review Data
  reviewBreakdown = [
    { label: 'Fit', value: 88 },
    { label: 'Quality', value: 94 },
    { label: 'Comfort', value: 92 },
    { label: 'Price', value: 85 },
  ];

  mockCustomerPhotos = [
    'https://images.unsplash.com/photo-1517705008128-361805f42e82?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
  ];

  mockReviews = [
    {
      id: 1,
      author: 'Sarah M.',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content:
        'Absolutely love this product! The quality exceeded my expectations and it arrived much faster than anticipated. Highly recommend to anyone looking for premium quality.',
    },
    {
      id: 2,
      author: 'James D.',
      rating: 4,
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content:
        'Great value for the price. The fit is almost perfect, just a bit tight around the edges but otherwise very comfortable.',
    },
    {
      id: 3,
      author: 'Emily R.',
      rating: 5,
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      content:
        'Purchased this as a gift and they loved it. The colors are vibrant and exactly as shown in the pictures. Will be buying another one for myself!',
    },
  ];

  isWishlisted = computed(() => {
    const p = this.product();
    return p ? this.wishlistService.isInWishlist(p.id) : false;
  });

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.productService.getProductById(id).subscribe((product) => {
          this.product.set(product);
          if (product) {
            this.selectedImage.set(product.imageUrl);
            this.recentlyViewedService.addProduct(product.id);
            this.productService.getRelatedProducts(product.id).subscribe((related) => {
              this.relatedProducts.set(related);
            });
            this.loadRecentlyViewed();
          }
        });
      }
    });
  }

  loadRecentlyViewed() {
    this.productService.getProducts().subscribe((products) => {
      const ids = this.recentlyViewedService.recentlyViewedIds();
      const currentId = this.product()?.id;
      const viewed = products
        .filter((p) => ids.includes(p.id) && p.id !== currentId) // Exclude current
        .sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
      this.recentlyViewedProducts.set(viewed);
    });
  }

  addToCart(product: Product) {
    if (product.colors && product.colors.length > 0 && !this.selectedColor()) {
      // If product has colors but none selected, select the first one by default or alert?
      // For better UX, let's select first one if not selected, or just pass undefined if logic allows
      // But requirement says "respect Color". So we should force selection or default.
      // Let's default to first color if none selected
      this.selectedColor.set(product.colors[0].name);
    }
    this.cartService.addToCart(product, this.selectedColor() || undefined);
  }

  toggleWishlist(product: Product) {
    this.wishlistService.toggle(product.id);
  }

  onQuickView(product: Product) {
    this.selectedQuickViewProduct.set(product);
  }

  closeQuickView() {
    this.selectedQuickViewProduct.set(undefined);
  }
}
