import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WishlistPage } from './wishlist-page';
import { ProductService } from '../../../products/services/product-api';
import { WishlistService } from '../../services/wishlist-store';
import { CartService } from '../../../cart/services/cart-store';
import { of } from 'rxjs';
import { Product } from '../../../products/models/product';
import { NO_ERRORS_SCHEMA, signal, WritableSignal } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('WishlistPage', () => {
  let component: WishlistPage;
  let fixture: ComponentFixture<WishlistPage>;
  let productServiceSpy: { getProducts: ReturnType<typeof vi.fn> };
  let wishlistServiceSpy: {
    wishlist: WritableSignal<number[]>;
    isInWishlist: ReturnType<typeof vi.fn>;
  };
  let cartServiceSpy: { addToCart: ReturnType<typeof vi.fn> };

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Prod1',
      price: 10,
      category: 'A',
      imageUrl: 'img1',
      description: 'desc1',
      rating: 5,
      reviews: 10,
    },
    {
      id: 2,
      name: 'Prod2',
      price: 20,
      category: 'B',
      imageUrl: 'img2',
      description: 'desc2',
      rating: 4,
      reviews: 5,
    },
  ];

  beforeEach(async () => {
    productServiceSpy = {
      getProducts: vi.fn().mockReturnValue(of(mockProducts)),
    };

    wishlistServiceSpy = {
      // Mock signal containing IDs
      wishlist: signal([1]),
      isInWishlist: vi.fn().mockReturnValue(true),
    };

    cartServiceSpy = {
      addToCart: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [WishlistPage],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: WishlistService, useValue: wishlistServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
        provideRouter([]),
      ],
    })
      .overrideComponent(WishlistPage, {
        set: { schemas: [NO_ERRORS_SCHEMA] }, // Avoid deeply initializing child components
      })
      .compileComponents();

    fixture = TestBed.createComponent(WishlistPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and calculate wishlistItems correctly', () => {
    expect(component).toBeTruthy();
    // Signal resolution: wishlist is [1], so wishlisted products is just mockProducts[0]
    expect(component.wishlistItems()).toEqual([mockProducts[0]]);
  });

  it('should call cartService when onAddToCart is triggered', () => {
    component.onAddToCart(mockProducts[0]);
    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('should open quick view when onQuickView is triggered', () => {
    component.onQuickView(mockProducts[1]);
    expect(component.selectedQuickViewProduct()).toEqual(mockProducts[1]);
  });

  it('should clear quick view when closeQuickView is called', () => {
    component.selectedQuickViewProduct.set(mockProducts[0]);
    component.closeQuickView();
    expect(component.selectedQuickViewProduct()).toBeUndefined();
  });
});
