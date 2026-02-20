import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { provideRouter, Router } from '@angular/router';
import { CartService } from '../../features/cart/services/cart-store';
import { WishlistService } from '../../features/wishlist/services/wishlist-store';
import { ProductService } from '../../features/products/services/product-api';
import { of } from 'rxjs';
import { signal, WritableSignal } from '@angular/core';
import { Product } from '../../features/products/models/product';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let cartServiceSpy: { cartCount: WritableSignal<number>; openDrawer: ReturnType<typeof vi.fn> };
  let wishlistServiceSpy: { wishlist: WritableSignal<number[]> };
  let productServiceSpy: { getProducts: ReturnType<typeof vi.fn> };
  let router: Router;

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Apple watch',
      price: 200,
      category: 'Tech',
      imageUrl: 'img1',
      description: 'desc',
      rating: 5,
      reviews: 10,
    },
    {
      id: 2,
      name: 'Apples',
      price: 5,
      category: 'Food',
      imageUrl: 'img2',
      description: 'desc',
      rating: 4,
      reviews: 5,
    },
  ];

  beforeEach(async () => {
    cartServiceSpy = {
      cartCount: signal(2),
      openDrawer: vi.fn(),
    };

    wishlistServiceSpy = {
      wishlist: signal([1, 2, 3]), // 3 items
    };

    productServiceSpy = {
      getProducts: vi.fn().mockReturnValue(of(mockProducts)),
    };

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceSpy },
        { provide: WishlistService, useValue: wishlistServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should read cartCount and wishlistCount from services', () => {
    expect(component.cartCount()).toBe(2);
    expect(component.wishlistCount()).toBe(3);
  });

  it('should toggle mobile menu', () => {
    expect(component.isMobileMenuOpen()).toBe(false);
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(true);
    component.toggleMobileMenu();
    expect(component.isMobileMenuOpen()).toBe(false);
  });

  it('should navigate on search submit and blur search', () => {
    const navigateSpy = vi.spyOn(router, 'navigate');
    component.searchQuery.set('apple');
    component.isSearchFocused.set(true);

    const event = new Event('submit');
    event.preventDefault = vi.fn();

    component.onSearchSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/'], { queryParams: { q: 'apple' } });
    expect(component.isSearchFocused()).toBe(false);
  });

  it('should open cart drawer', () => {
    component.openCart();
    expect(cartServiceSpy.openDrawer).toHaveBeenCalled();
  });

  it('should update searchQuery on input', () => {
    const inputEvent = {
      target: { value: 'test query' },
    } as unknown as Event;

    component.onSearch(inputEvent);
    expect(component.searchQuery()).toBe('test query');
  });
});
