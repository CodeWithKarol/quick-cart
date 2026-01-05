import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="checkout-container">
      <h2>Checkout</h2>

      <div class="checkout-content">
        <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
          <div class="form-section">
            <h3>Shipping Information</h3>

            <div class="form-group">
              <label for="fullName">Full Name</label>
              <input id="fullName" type="text" formControlName="fullName" />
              @if (checkoutForm.get('fullName')?.touched && checkoutForm.get('fullName')?.invalid) {
              <span class="error">Name is required</span>
              }
            </div>

            <div class="form-group">
              <label for="email">Email</label>
              <input id="email" type="email" formControlName="email" />
              @if (checkoutForm.get('email')?.touched && checkoutForm.get('email')?.invalid) {
              <span class="error">Valid email is required</span>
              }
            </div>

            <div class="form-group">
              <label for="address">Address</label>
              <input id="address" type="text" formControlName="address" />
              @if (checkoutForm.get('address')?.touched && checkoutForm.get('address')?.invalid) {
              <span class="error">Address is required</span>
              }
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="city">City</label>
                <input id="city" type="text" formControlName="city" />
                @if (checkoutForm.get('city')?.touched && checkoutForm.get('city')?.invalid) {
                <span class="error">City is required</span>
                }
              </div>
              <div class="form-group">
                <label for="zipCode">Zip Code</label>
                <input id="zipCode" type="text" formControlName="zipCode" />
                @if (checkoutForm.get('zipCode')?.touched && checkoutForm.get('zipCode')?.invalid) {
                <span class="error">Zip Code is required</span>
                }
              </div>
            </div>
          </div>

          <div class="form-section">
            <h3>Payment Details (Fake)</h3>
            <div class="form-group">
              <label for="cardNumber">Card Number</label>
              <input
                id="cardNumber"
                type="text"
                formControlName="cardNumber"
                placeholder="0000 0000 0000 0000"
              />
              @if (checkoutForm.get('cardNumber')?.touched &&
              checkoutForm.get('cardNumber')?.invalid) {
              <span class="error">Valid card number is required</span>
              }
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="expiry">Expiry</label>
                <input id="expiry" type="text" formControlName="expiry" placeholder="MM/YY" />
                @if (checkoutForm.get('expiry')?.touched && checkoutForm.get('expiry')?.invalid) {
                <span class="error">Required</span>
                }
              </div>
              <div class="form-group">
                <label for="cvv">CVV</label>
                <input id="cvv" type="text" formControlName="cvv" placeholder="123" />
                @if (checkoutForm.get('cvv')?.touched && checkoutForm.get('cvv')?.invalid) {
                <span class="error">Required</span>
                }
              </div>
            </div>
          </div>

          <button type="submit" [disabled]="checkoutForm.invalid || isProcessing">
            {{ isProcessing ? 'Processing...' : 'Place Order (' + (cartTotal() | currency) + ')' }}
          </button>
        </form>

        <div class="order-summary">
          <h3>Order Summary</h3>
          @for (item of cartItems(); track item.product.id) {
          <div class="summary-item">
            <span>{{ item.quantity }}x {{ item.product.name }}</span>
            <span>{{ item.product.price * item.quantity | currency }}</span>
          </div>
          }
          <div class="total-row">
            <span>Total</span>
            <span>{{ cartTotal() | currency }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .checkout-container {
        padding: 20px;
        max-width: 1000px;
        margin: 0 auto;
      }
      .checkout-content {
        display: grid;
        grid-template-columns: 1fr 350px;
        gap: 40px;
      }
      @media (max-width: 768px) {
        .checkout-content {
          grid-template-columns: 1fr;
        }
      }
      .form-section {
        margin-bottom: 32px;
      }
      h3 {
        margin-bottom: 16px;
        border-bottom: 1px solid #eee;
        padding-bottom: 8px;
      }
      .form-group {
        margin-bottom: 16px;
      }
      .form-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      label {
        display: block;
        margin-bottom: 6px;
        font-weight: 500;
      }
      input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;
      }
      input.ng-invalid.ng-touched {
        border-color: #dc3545;
      }
      .error {
        color: #dc3545;
        font-size: 0.85rem;
        margin-top: 4px;
        display: block;
      }
      button[type='submit'] {
        width: 100%;
        padding: 14px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1.1rem;
        cursor: pointer;
        font-weight: bold;
      }
      button:disabled {
        background-color: #94d3a2;
        cursor: not-allowed;
      }
      .order-summary {
        background: #f8f9fa;
        padding: 24px;
        border-radius: 8px;
        height: fit-content;
      }
      .summary-item {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
        font-size: 0.95rem;
      }
      .total-row {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        font-size: 1.2rem;
        margin-top: 16px;
        padding-top: 16px;
        border-top: 1px solid #ddd;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private router = inject(Router);

  cartItems = this.cartService.cartItems;
  cartTotal = this.cartService.cartTotal;
  isProcessing = false;

  checkoutForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    expiry: ['', Validators.required],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
  });

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.isProcessing = true;

      // Simulate API call
      setTimeout(() => {
        this.isProcessing = false;
        this.cartService.clearCart();
        alert('Order placed successfully!');
        this.router.navigate(['/']);
      }, 2000);
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}
