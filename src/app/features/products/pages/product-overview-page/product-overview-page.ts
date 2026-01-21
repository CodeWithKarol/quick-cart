import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../../cart/services/cart-service';
import { WishlistService } from '../../../../features/wishlist/services/wishlist.service';
import { RecentlyViewedService } from '../../services/recently-viewed.service';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';
import { QuickViewComponent } from '../../components/quick-view/quick-view.component';
import { ImageZoomDirective } from '../../../../shared/directives/image-zoom.directive';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    RouterLink,
    ProductCard,
    ImageZoomDirective,
    QuickViewComponent,
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
              <div class="flex flex-col-reverse">
                <div class="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                  <div class="grid grid-cols-4 gap-6" aria-orientation="horizontal" role="tablist">
                    @for (image of product.images || [product.imageUrl]; track image) {
                      <button
                        id="tabs-1-tab-1"
                        class="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                        [class.ring-indigo-500]="selectedImage() === image"
                        (click)="selectedImage.set(image)"
                        type="button"
                        role="tab"
                      >
                        <span class="sr-only">Image view</span>
                        <span class="absolute inset-0 overflow-hidden rounded-md">
                          <img
                            [src]="image"
                            alt=""
                            class="h-full w-full object-cover object-center"
                          />
                        </span>
                        <span
                          class="pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                          [class.ring-indigo-500]="selectedImage() === image"
                          [class.ring-transparent]="selectedImage() !== image"
                          aria-hidden="true"
                        ></span>
                      </button>
                    }
                  </div>
                </div>

                <div
                  class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 sm:aspect-h-3 sm:aspect-w-2"
                  [appImageZoom]="2"
                >
                  <img
                    [ngSrc]="selectedImage() || product.imageUrl"
                    [alt]="product.name"
                    width="600"
                    height="600"
                    priority
                    class="h-full w-full object-cover object-center sm:rounded-lg"
                  />
                </div>
              </div>

              <!-- Product info -->
              <div class="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">{{ product.name }}</h1>

                <div class="mt-3">
                  <h2 class="sr-only">Product information</h2>
                  <p class="text-3xl tracking-tight text-gray-900">
                    {{ product.price | currency }}
                  </p>
                </div>

                <!-- Reviews -->
                <div class="mt-3">
                  <h3 class="sr-only">Reviews</h3>
                  <div class="flex items-center">
                    <div class="flex items-center">
                      @for (star of [0, 1, 2, 3, 4]; track star) {
                        <svg
                          class="h-5 w-5 text-indigo-500 flex-shrink-0"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      }
                    </div>
                    <p class="sr-only">5 out of 5 stars</p>
                  </div>
                </div>

                <!-- Colors -->
                @if (product.colors && product.colors.length > 0) {
                  <div class="mt-6">
                    <h3 class="text-sm font-medium text-gray-900">Available Colors</h3>
                    <div class="mt-4 flex items-center space-x-3">
                      @for (color of product.colors; track color.name) {
                        <button
                          type="button"
                          class="relative -m-0.5 flex items-center justify-center rounded-full p-0.5 ring-2 ring-offset-1 focus:outline-none"
                          [class.ring-indigo-500]="selectedColor() === color.name"
                          [class.ring-transparent]="selectedColor() !== color.name"
                          (click)="selectedColor.set(color.name)"
                          [title]="color.name"
                        >
                          <span class="sr-only">{{ color.name }}</span>
                          <span
                            aria-hidden="true"
                            class="h-8 w-8 rounded-full border border-black border-opacity-10"
                            [class]="color.class"
                          ></span>
                        </button>
                      }
                    </div>
                  </div>
                }

                <div class="mt-6">
                  <h3 class="sr-only">Description</h3>
                  <div class="space-y-6 text-base text-gray-700">
                    <p>{{ product.description }}</p>
                  </div>
                </div>

                <div class="mt-6">
                  <div class="flex items-center">
                    <svg
                      class="h-5 w-5 flex-shrink-0 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p class="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
                  </div>
                </div>

                <div class="mt-10 flex gap-4">
                  <button
                    type="button"
                    (click)="addToCart(product)"
                    class="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add to cart
                  </button>

                  <button
                    type="button"
                    (click)="toggleWishlist(product)"
                    class="flex items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                    [class.text-red-500]="isWishlisted()"
                  >
                    <span class="sr-only">Add to wishlist</span>
                    <svg
                      class="h-6 w-6 flex-shrink-0"
                      [class.fill-current]="isWishlisted()"
                      viewBox="0 0 20 20"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      />
                    </svg>
                  </button>
                </div>

                <div class="mt-10 border-t border-gray-200 pt-10">
                  <h3 class="text-sm font-medium text-gray-900">Highlights</h3>
                  <div class="mt-4 prose prose-sm text-gray-500">
                    <ul role="list">
                      <li>Durable and long-lasting material</li>
                      <li>Designed for comfort and style</li>
                      <li>Premium finish and attention to detail</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reviews Section -->
            <section aria-labelledby="reviews-heading" class="mt-16 border-t border-gray-200 pt-16">
              <h2 id="reviews-heading" class="text-2xl font-bold tracking-tight text-gray-900">
                Customer Reviews
              </h2>

              <div class="mt-6 lg:grid lg:grid-cols-12 lg:gap-x-8">
                <!-- Review Summary & Breakdown -->
                <div class="lg:col-span-4">
                  <div class="flex items-center">
                    <div class="flex items-center">
                      @for (star of [0, 1, 2, 3, 4]; track star) {
                        <svg
                          class="h-5 w-5 flex-shrink-0"
                          [class.text-yellow-400]="(product.rating || 0) > star"
                          [class.text-gray-300]="(product.rating || 0) <= star"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      }
                    </div>
                    <p class="ml-2 text-sm text-gray-900">Based on {{ product.reviews }} reviews</p>
                  </div>

                  <div class="mt-6">
                    <h3 class="sr-only">Review data</h3>
                    <dl class="space-y-3">
                      @for (item of reviewBreakdown; track item.label) {
                        <div class="flex items-center text-sm">
                          <dt class="flex-1 text-gray-500">{{ item.label }}</dt>
                          <dd class="ml-3 flex flex-1 items-center">
                            <div class="flex-1 rounded-full bg-gray-200 h-2">
                              <div
                                class="h-2 rounded-full bg-indigo-600"
                                [style.width.%]="item.value"
                              ></div>
                            </div>
                            <span class="ml-3 w-9 text-right text-gray-900">{{ item.value }}%</span>
                          </dd>
                        </div>
                      }
                    </dl>
                  </div>

                  <div class="mt-10">
                    <h3 class="text-sm font-medium text-gray-900">Share your thoughts</h3>
                    <p class="mt-1 text-sm text-gray-600">
                      If you’ve used this product, share your thoughts with other customers.
                    </p>
                    <a
                      href="#"
                      class="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                    >
                      Write a review
                    </a>
                  </div>
                </div>

                <!-- Recent Reviews & Photos -->
                <div class="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
                  <h3 class="text-lg font-medium text-gray-900">Customer Photos</h3>
                  <div
                    class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 lg:grid-cols-4 lg:gap-8"
                  >
                    @for (photo of mockCustomerPhotos; track photo) {
                      <img
                        [src]="photo"
                        alt="Customer photo"
                        class="rounded-lg bg-gray-100 object-cover h-24 w-full"
                      />
                    }
                  </div>

                  <div class="flow-root mt-10">
                    <h3 class="text-lg font-medium text-gray-900">Recent Reviews</h3>
                    <div class="mt-6 divide-y divide-gray-200">
                      @for (review of mockReviews; track review.id) {
                        <div class="py-6">
                          <div class="flex items-center">
                            <img
                              [src]="review.avatar"
                              [alt]="review.author"
                              class="h-10 w-10 rounded-full object-cover"
                            />
                            <div class="ml-4">
                              <h4 class="text-sm font-bold text-gray-900">{{ review.author }}</h4>
                              <div class="mt-1 flex items-center">
                                @for (star of [0, 1, 2, 3, 4]; track star) {
                                  <svg
                                    class="h-4 w-4"
                                    [class.text-yellow-400]="review.rating > star"
                                    [class.text-gray-300]="review.rating <= star"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      fill-rule="evenodd"
                                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.453 1.415 1.02L10 15.591l4.069 2.485c.724.442 1.609-.198 1.415-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.651l-4.752-.382-1.831-4.401z"
                                      clip-rule="evenodd"
                                    />
                                  </svg>
                                }
                              </div>
                            </div>
                          </div>

                          <div class="mt-4 space-y-6 text-sm text-gray-600 italic">
                            <p>{{ review.content }}</p>
                          </div>
                          <p class="mt-2 text-xs text-gray-500 font-medium">Verified Purchase</p>
                        </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </section>

            @if (relatedProducts().length > 0) {
              <div class="mt-16 border-t border-gray-200 pt-16">
                <h2 class="text-2xl font-bold tracking-tight text-gray-900">
                  Customers also purchased
                </h2>
                <div
                  class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8"
                >
                  @for (related of relatedProducts(); track related.id) {
                    <app-product-card
                      [product]="related"
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
                  @for (recent of recentlyViewedProducts(); track recent.id) {
                    <app-product-card
                      [product]="recent"
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
