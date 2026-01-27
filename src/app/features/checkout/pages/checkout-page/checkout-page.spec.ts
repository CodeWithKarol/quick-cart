import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutPage } from './checkout-page';
import { CartService } from '../../../cart/services/cart-store';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';
import { signal, computed } from '@angular/core';
import { vi } from 'vitest';

describe('CheckoutPage', () => {
  let component: CheckoutPage;
  let fixture: ComponentFixture<CheckoutPage>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cartServiceSpy: any;
  let router: Router;

  beforeEach(async () => {
    cartServiceSpy = {
      clearCart: vi.fn(),
      cartItems: signal([]),
      cartTotal: computed(() => 100), // Fixed amount for easier calc
    };

    await TestBed.configureTestingModule({
      imports: [CheckoutPage],
      providers: [provideRouter([]), { provide: CartService, useValue: cartServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();

    // Mock alert
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form initially', () => {
    expect(component.checkoutForm.valid).toBe(false);
  });

  it('should validate email', () => {
    const emailControl = component.checkoutForm.get('email');
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBe(false);
    emailControl?.setValue('test@example.com');
    expect(emailControl?.valid).toBe(true);
  });

  it('should validate payment fields', () => {
    const cardControl = component.checkoutForm.get('cardNumber');
    const expiryControl = component.checkoutForm.get('expiry');
    const cvvControl = component.checkoutForm.get('cvv');

    // Invalid cases
    cardControl?.setValue('123'); // Too short
    expect(cardControl?.valid).toBe(false);

    expiryControl?.setValue('13/25'); // Invalid month
    expect(expiryControl?.valid).toBe(false);

    cvvControl?.setValue('12'); // Too short
    expect(cvvControl?.valid).toBe(false);

    // Valid cases
    cardControl?.setValue('1234567812345678');
    expect(cardControl?.valid).toBe(true);

    expiryControl?.setValue('12/25');
    expect(expiryControl?.valid).toBe(true);

    cvvControl?.setValue('123');
    expect(cvvControl?.valid).toBe(true);
  });

  it('should calculate shipping and total correctly', () => {
    // Initial state (standard shipping)
    expect(component.deliveryMethod()).toBe('standard');
    expect(component.shippingCost()).toBe(5.0);
    expect(component.total()).toBe(105.0); // 100 + 5

    // Change to express
    component.setDeliveryMethod('express');
    expect(component.deliveryMethod()).toBe('express');
    expect(component.shippingCost()).toBe(15.0);
    expect(component.total()).toBe(115.0); // 100 + 15
  });

  it('should not submit if form is invalid', () => {
    const markAllAsTouchedSpy = vi.spyOn(component.checkoutForm, 'markAllAsTouched');
    component.onSubmit();

    expect(component.checkoutForm.valid).toBe(false);
    expect(markAllAsTouchedSpy).toHaveBeenCalled();
    expect(cartServiceSpy.clearCart).not.toHaveBeenCalled();
  });

  it('should process order if form is valid', () => {
    vi.useFakeTimers();
    const navigateSpy = vi.spyOn(router, 'navigate');

    // Fill form with valid data
    component.checkoutForm.patchValue({
      fullName: 'John Doe',
      email: 'john@example.com',
      address: '123 Main St',
      city: 'New York',
      zipCode: '10001',
      cardNumber: '1234567812345678',
      expiry: '12/25',
      cvv: '123',
    });

    expect(component.checkoutForm.valid).toBe(true);

    component.onSubmit();

    expect(component.isProcessing).toBe(true);

    // Fast-forward 2000ms
    vi.advanceTimersByTime(2000);

    expect(component.isProcessing).toBe(false);
    expect(cartServiceSpy.clearCart).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/order-success']);

    vi.useRealTimers();
  });
});
