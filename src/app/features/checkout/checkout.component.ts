import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="bg-gray-50 min-h-screen pb-24 pt-16">
      <div class="mx-auto max-w-2xl px-4 pt-16 pb-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 class="sr-only">Checkout</h2>

        <div class="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <!-- Order Summary (Right Column on Desktop, Top on Mobile) -->
          <section aria-labelledby="summary-heading" class="lg:col-start-2">
            <div class="mx-auto max-w-lg px-4 lg:max-w-none lg:px-0">
              <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

              <ul role="list" class="divide-y divide-gray-200 text-sm font-medium text-gray-900">
                @for (item of cartItems(); track item.product.id) {
                <li class="flex items-start space-x-4 py-6">
                  <img
                    [src]="item.product.imageUrl"
                    [alt]="item.product.name"
                    class="h-20 w-20 flex-none rounded-md object-cover object-center"
                  />
                  <div class="flex-auto space-y-1">
                    <h3>{{ item.product.name }}</h3>
                    <p class="text-gray-500">{{ item.product.category }}</p>
                    <p class="text-gray-500">Qty {{ item.quantity }}</p>
                  </div>
                  <p class="flex-none text-base font-medium">
                    {{ item.product.price * item.quantity | currency }}
                  </p>
                </li>
                }
              </ul>

              <dl
                class="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block"
              >
                <div class="flex items-center justify-between">
                  <dt class="text-gray-600">Subtotal</dt>
                  <dd>{{ cartTotal() | currency }}</dd>
                </div>

                <div class="flex items-center justify-between">
                  <dt class="text-gray-600">Shipping</dt>
                  <dd>$5.00</dd>
                </div>

                <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt class="text-base">Total</dt>
                  <dd class="text-base">{{ cartTotal() + 5 | currency }}</dd>
                </div>
              </dl>
            </div>
          </section>

          <!-- Checkout Form (Left Column on Desktop) -->
          <section
            aria-labelledby="payment-and-shipping-heading"
            class="lg:col-start-1 lg:row-start-1"
          >
            <div class="mx-auto max-w-lg px-4 lg:max-w-none lg:px-0">
              <h2 id="payment-and-shipping-heading" class="sr-only">
                Payment and shipping details
              </h2>

              <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
                <div class="mx-auto max-w-2xl px-4 lg:max-w-none lg:px-0">
                  <div>
                    <h3 id="contact-info-heading" class="text-lg font-medium text-gray-900">
                      Contact information
                    </h3>

                    <div class="mt-6">
                      <label for="email-address" class="block text-sm font-medium text-gray-700"
                        >Email address</label
                      >
                      <div class="mt-1">
                        <input
                          type="email"
                          id="email-address"
                          formControlName="email"
                          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          [class.border-red-300]="
                            checkoutForm.get('email')?.touched && checkoutForm.get('email')?.invalid
                          "
                        />
                        @if (checkoutForm.get('email')?.touched &&
                        checkoutForm.get('email')?.invalid) {
                        <p class="mt-2 text-sm text-red-600">Valid email is required</p>
                        }
                      </div>
                    </div>
                  </div>

                  <div class="mt-10">
                    <h3 id="shipping-heading" class="text-lg font-medium text-gray-900">
                      Shipping address
                    </h3>

                    <div class="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                      <div class="sm:col-span-3">
                        <label for="full-name" class="block text-sm font-medium text-gray-700"
                          >Full name</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            id="full-name"
                            formControlName="fullName"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            [class.border-red-300]="
                              checkoutForm.get('fullName')?.touched &&
                              checkoutForm.get('fullName')?.invalid
                            "
                          />
                          @if (checkoutForm.get('fullName')?.touched &&
                          checkoutForm.get('fullName')?.invalid) {
                          <p class="mt-2 text-sm text-red-600">Name is required</p>
                          }
                        </div>
                      </div>

                      <div class="sm:col-span-3">
                        <label for="address" class="block text-sm font-medium text-gray-700"
                          >Address</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            id="address"
                            formControlName="address"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            [class.border-red-300]="
                              checkoutForm.get('address')?.touched &&
                              checkoutForm.get('address')?.invalid
                            "
                          />
                          @if (checkoutForm.get('address')?.touched &&
                          checkoutForm.get('address')?.invalid) {
                          <p class="mt-2 text-sm text-red-600">Address is required</p>
                          }
                        </div>
                      </div>

                      <div class="sm:col-span-1">
                        <label for="city" class="block text-sm font-medium text-gray-700"
                          >City</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            id="city"
                            formControlName="city"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            [class.border-red-300]="
                              checkoutForm.get('city')?.touched && checkoutForm.get('city')?.invalid
                            "
                          />
                          @if (checkoutForm.get('city')?.touched &&
                          checkoutForm.get('city')?.invalid) {
                          <p class="mt-2 text-sm text-red-600">Required</p>
                          }
                        </div>
                      </div>

                      <div class="sm:col-span-1">
                        <label for="postal-code" class="block text-sm font-medium text-gray-700"
                          >Zip Code</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            id="postal-code"
                            formControlName="zipCode"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            [class.border-red-300]="
                              checkoutForm.get('zipCode')?.touched &&
                              checkoutForm.get('zipCode')?.invalid
                            "
                          />
                          @if (checkoutForm.get('zipCode')?.touched &&
                          checkoutForm.get('zipCode')?.invalid) {
                          <p class="mt-2 text-sm text-red-600">Required</p>
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="mt-10">
                    <h3 id="payment-heading" class="text-lg font-medium text-gray-900">
                      Payment details
                    </h3>

                    <div class="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                      <div class="col-span-3 sm:col-span-4">
                        <label for="card-number" class="block text-sm font-medium text-gray-700"
                          >Card number</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            id="card-number"
                            formControlName="cardNumber"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="0000 0000 0000 0000"
                            [class.border-red-300]="
                              checkoutForm.get('cardNumber')?.touched &&
                              checkoutForm.get('cardNumber')?.invalid
                            "
                          />
                          @if (checkoutForm.get('cardNumber')?.touched &&
                          checkoutForm.get('cardNumber')?.invalid) {
                          <p class="mt-2 text-sm text-red-600">Valid card number is required</p>
                          }
                        </div>
                      </div>

                      <div class="col-span-2 sm:col-span-3">
                        <label for="expiration-date" class="block text-sm font-medium text-gray-700"
                          >Expiration date (MM/YY)</label
                        >
                        <div class="mt-1">
                          <input
                            type="text"
                            id="expiration-date"
                            formControlName="expiry"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="MM/YY"
                            [class.border-red-300]="
                              checkoutForm.get('expiry')?.touched &&
                              checkoutForm.get('expiry')?.invalid
                            "
                          />
                          @if (checkoutForm.get('expiry')?.touched &&
                          checkoutForm.get('expiry')?.invalid) {
                          <p class="mt-2 text-sm text-red-600">Required</p>
                          }
                        </div>
                      </div>

                      <div>
                        <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
                        <div class="mt-1">
                          <input
                            type="text"
                            id="cvc"
                            formControlName="cvv"
                            class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="123"
                            [class.border-red-300]="
                              checkoutForm.get('cvv')?.touched && checkoutForm.get('cvv')?.invalid
                            "
                          />
                          @if (checkoutForm.get('cvv')?.touched && checkoutForm.get('cvv')?.invalid)
                          {
                          <p class="mt-2 text-sm text-red-600">Required</p>
                          }
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    class="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between"
                  >
                    <button
                      type="submit"
                      [disabled]="checkoutForm.invalid || isProcessing"
                      class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed sm:order-last sm:w-auto"
                    >
                      {{ isProcessing ? 'Processing...' : 'Place Order' }}
                    </button>
                    <p class="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                      You won't be charged until the next step.
                    </p>
                  </div>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [],
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
