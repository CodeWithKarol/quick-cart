import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductOverviewPage } from './product-overview-page';
import { ProductService } from '../../services/product-api';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../cart/services/cart-store';
import { WishlistService } from '../../../../features/wishlist/services/wishlist-store';
import { RecentlyViewedService } from '../../services/recently-viewed-store';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Product } from '../../models/product';

describe('ProductOverviewPage', () => {
  let component: ProductOverviewPage;
  let fixture: ComponentFixture<ProductOverviewPage>;

  let productServiceSpy: {
    getProductById: ReturnType<typeof vi.fn>;
    getRelatedProducts: ReturnType<typeof vi.fn>;
    getProducts: ReturnType<typeof vi.fn>;
  };
  let cartServiceSpy: { addToCart: ReturnType<typeof vi.fn> };
  let wishlistServiceSpy: {
    toggle: ReturnType<typeof vi.fn>;
    isInWishlist: ReturnType<typeof vi.fn>;
  };
  let recentlyViewedServiceSpy: {
    addProduct: ReturnType<typeof vi.fn>;
    recentlyViewedIds: ReturnType<typeof vi.fn>;
  };
  let paramsSubject: BehaviorSubject<Map<string, string>>;

  const mockProduct = {
    id: 1,
    name: 'Prod1',
    category: 'Cat1',
    price: 10,
    colors: [{ name: 'Red' }, { name: 'Blue' }],
  };
  const mockRelated = [{ id: 2 }];
  const mockProducts = [{ id: 1 }, { id: 3 }, { id: 4 }];

  beforeEach(async () => {
    productServiceSpy = {
      getProductById: vi.fn().mockReturnValue(of(mockProduct)),
      getRelatedProducts: vi.fn().mockReturnValue(of(mockRelated)),
      getProducts: vi.fn().mockReturnValue(of(mockProducts)),
    };

    cartServiceSpy = { addToCart: vi.fn() };
    wishlistServiceSpy = { toggle: vi.fn(), isInWishlist: vi.fn().mockReturnValue(false) };
    recentlyViewedServiceSpy = {
      addProduct: vi.fn(),
      recentlyViewedIds: vi.fn().mockReturnValue([4, 3]),
    };

    paramsSubject = new BehaviorSubject(new Map([['id', '1']]));

    await TestBed.configureTestingModule({
      imports: [ProductOverviewPage],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: WishlistService, useValue: wishlistServiceSpy },
        { provide: RecentlyViewedService, useValue: recentlyViewedServiceSpy },
        { provide: ActivatedRoute, useValue: { paramMap: paramsSubject.asObservable() } },
      ],
    })
      .overrideComponent(ProductOverviewPage, {
        set: { imports: [CommonModule], schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProductOverviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load data on init', () => {
    expect(component).toBeTruthy();
    expect(productServiceSpy.getProductById).toHaveBeenCalledWith(1);
    expect(recentlyViewedServiceSpy.addProduct).toHaveBeenCalledWith(1);
    expect(productServiceSpy.getRelatedProducts).toHaveBeenCalledWith(1);

    expect(component.product()).toEqual(mockProduct);
    expect(component.relatedProducts()).toEqual(mockRelated);
    // Recently viewed 4, 3
    expect(component.recentlyViewedProducts().length).toBe(2);
    expect(component.recentlyViewedProducts()[0].id).toBe(4);
    expect(component.recentlyViewedProducts()[1].id).toBe(3);
  });

  it('should format breadcrumbs correctly', () => {
    const bc = component.breadcrumbs();
    expect(bc.length).toBe(3);
    expect(bc[1].label).toBe('Cat1');
    expect(bc[2].label).toBe('Prod1');
  });

  it('should default to first color if no color selected when adding to cart', () => {
    expect(component.selectedColor()).toBeNull();
    component.addToCart(mockProduct as Product);
    expect(component.selectedColor()).toBe('Red');
    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(mockProduct, 'Red');
  });

  it('should toggle wishlist', () => {
    component.toggleWishlist(mockProduct as Product);
    expect(wishlistServiceSpy.toggle).toHaveBeenCalledWith(1);
  });

  it('should handle quick view', () => {
    component.onQuickView(mockRelated[0] as Product);
    expect(component.selectedQuickViewProduct()).toEqual(mockRelated[0]);

    component.closeQuickView();
    expect(component.selectedQuickViewProduct()).toBeUndefined();
  });
});
