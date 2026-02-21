import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDrawerComponent } from './cart-drawer';
import { CartService } from '../../services/cart-store';
import { WishlistService } from '../../../wishlist/services/wishlist-store';
import { signal, computed } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CurrencyPipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CartDrawerComponent', () => {
  let component: CartDrawerComponent;
  let fixture: ComponentFixture<CartDrawerComponent>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cartServiceSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let wishlistServiceSpy: any;

  beforeEach(async () => {
    cartServiceSpy = {
      isDrawerOpen: signal(true),
      cartItems: signal([]),
      cartCount: computed(() => 0),
      cartTotal: computed(() => 0),
      freeShippingProgress: computed(() => 0),
      remainingForFreeShipping: computed(() => 100),
      closeDrawer: vi.fn(),
      removeFromCart: vi.fn(),
      updateQuantity: vi.fn(),
      shippingCost: computed(() => 0),
      taxAmount: computed(() => 0),
      orderTotal: computed(() => 0),
    };

    wishlistServiceSpy = {
      add: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [CartDrawerComponent, CurrencyPipe],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: CartService, useValue: cartServiceSpy },
        { provide: WishlistService, useValue: wishlistServiceSpy },
      ],
    })
      .overrideComponent(CartDrawerComponent, {
        set: {
          imports: [CurrencyPipe],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(CartDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call close on CartService', () => {
    component.close();
    expect(cartServiceSpy.closeDrawer).toHaveBeenCalled();
  });

  it('should show empty state when cart is empty', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-cart-drawer-empty')).toBeTruthy();
  });

  it('should show cart items when cart is not empty', () => {
    cartServiceSpy.cartItems.set([{ product: { id: 1, name: 'P1', price: 10 }, quantity: 1 }]);
    cartServiceSpy.cartCount = computed(() => 1);
    cartServiceSpy.cartTotal = computed(() => 10);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-cart-drawer-empty')).toBeFalsy();
    expect(compiled.querySelectorAll('app-cart-drawer-item').length).toBe(1);
  });

  it('should call cart methods from events', () => {
    component.removeItem(1);
    expect(cartServiceSpy.removeFromCart).toHaveBeenCalledWith(1, undefined);

    component.updateItemQuantity(1, 5);
    expect(cartServiceSpy.updateQuantity).toHaveBeenCalledWith(1, 5, undefined);
  });

  it('should move item to wishlist on saveForLater', () => {
    component.onSaveForLater(1, 'Red');
    expect(wishlistServiceSpy.add).toHaveBeenCalledWith(1, 'Red');
    expect(cartServiceSpy.removeFromCart).toHaveBeenCalledWith(1, 'Red');
  });
});
