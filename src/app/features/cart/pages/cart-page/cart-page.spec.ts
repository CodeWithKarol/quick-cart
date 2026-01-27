import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartPage } from './cart-page';
import { CartService } from '../../services/cart-store';
import { provideRouter } from '@angular/router';
import { signal, computed } from '@angular/core';
import { CartItem } from '../../models/cart-item';
import { vi } from 'vitest';

describe('CartPage', () => {
  let component: CartPage;
  let fixture: ComponentFixture<CartPage>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cartServiceSpy: any;

  const mockCartItems: CartItem[] = [
    {
      product: {
        id: 1,
        name: 'P1',
        price: 10,
        description: 'D1',
        imageUrl: 'img1',
        category: 'C1',
        rating: 4.5,
        reviews: 10,
      },
      quantity: 2,
    },
  ];

  beforeEach(async () => {
    cartServiceSpy = {
      updateQuantity: vi.fn(),
      removeFromCart: vi.fn(),
      cartItems: signal(mockCartItems),
      cartCount: computed(() => 2),
      cartTotal: computed(() => 20),
    };

    await TestBed.configureTestingModule({
      imports: [CartPage],
      providers: [provideRouter([]), { provide: CartService, useValue: cartServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cart items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-cart-item').length).toBe(1);
    expect(compiled.querySelector('app-cart-item')?.textContent).toContain('P1');
  });

  it('should call updateQuantity', () => {
    component.updateQuantity(1, 3);
    expect(cartServiceSpy.updateQuantity).toHaveBeenCalledWith(1, 3);
  });

  it('should call removeItem', () => {
    component.removeItem(1);
    expect(cartServiceSpy.removeFromCart).toHaveBeenCalledWith(1);
  });
});
