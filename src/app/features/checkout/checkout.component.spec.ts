import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutComponent } from './checkout.component';
import { CartService } from '../../core/services/cart.service';
import { provideRouter } from '@angular/router';
import { signal, computed } from '@angular/core';
import { vi } from 'vitest';

describe('CheckoutComponent', () => {
  let component: CheckoutComponent;
  let fixture: ComponentFixture<CheckoutComponent>;
  let cartServiceSpy: any;

  beforeEach(async () => {
    cartServiceSpy = {
      clearCart: vi.fn(),
      cartItems: signal([]),
      cartTotal: computed(() => 0),
    };

    await TestBed.configureTestingModule({
      imports: [CheckoutComponent],
      providers: [provideRouter([]), { provide: CartService, useValue: cartServiceSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
});
