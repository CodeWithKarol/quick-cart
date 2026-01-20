import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../../cart/services/cart-service';
import { WishlistService } from '../../../../features/wishlist/services/wishlist.service';
import { Product } from '../../models/product';
import { ProductCard } from '../../components/product-card/product-card';

@Component({
  selector: 'app-product-overview',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, ProductCard],
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
              <a routerLink="/" class="mr-2 text-sm font-medium text-gray-900">Products</a>
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
            <a href="#" aria-current="page" class="font-medium text-gray-500 hover:text-gray-600">{{
              product()?.name
            }}</a>
          </li>
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
    </div>
  `,
})
export class ProductOverviewPage implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);

  product = signal<Product | undefined>(undefined);
  relatedProducts = signal<Product[]>([]);
  selectedImage = signal<string>('');

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
            this.productService.getRelatedProducts(product.id).subscribe((related) => {
              this.relatedProducts.set(related);
            });
          }
        });
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  toggleWishlist(product: Product) {
    this.wishlistService.toggle(product.id);
  }
}
