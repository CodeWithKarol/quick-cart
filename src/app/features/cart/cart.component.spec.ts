import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { CartService } from '../../core/services/cart.service';
import { provideRouter } from '@angular/router';
import { signal, computed } from '@angular/core';
import { CartItem } from '../../core/models/cart-item.model';
import { vi } from 'vitest';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
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
      imports: [CartComponent],
      providers: [provideRouter([]), { provide: CartService, useValue: cartServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display cart items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.cart-item').length).toBe(1);
    expect(compiled.querySelector('.item-details h3')?.textContent).toContain('P1');
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
