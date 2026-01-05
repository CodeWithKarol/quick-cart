import { Component, inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
                  <dt class="flex items-center text-gray-600">
                    <span>Shipping estimate</span>
                    <div class="relative ml-2 group">
                      <div class="flex-shrink-0 text-gray-400 hover:text-gray-500 cursor-help">
                        <span class="sr-only">Learn more about how shipping is calculated</span>
                        <svg
                          class="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM8.94 6.94a.75.75 0 11-1.061-1.061 3 3 0 112.871 5.026v.345a.75.75 0 01-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 108.94 6.94zM10 15a1 1 0 100-2 1 1 0 000 2z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                      <div
                        class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-gray-900 text-white text-xs rounded shadow-lg z-50 text-center"
                      >
                        Shipping costs are calculated based on your location and selected delivery
                        method.
                        <div
                          class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"
                        ></div>
                      </div>
                    </div>
                  </dt>
                  <dd>{{ shippingCost() | currency }}</dd>
                </div>

                <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt class="text-base">Total</dt>
                  <dd class="text-base">{{ total() | currency }}</dd>
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
                      <div class="relative mt-1 rounded-md shadow-sm">
                        <div
                          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                        >
                          <svg
                            class="h-5 w-5 text-gray-400"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              d="M3 4a2 2 0 00-2 2v1.161l8.441 4.221a1.25 1.25 0 001.118 0L19 7.162V6a2 2 0 00-2-2H3z"
                            />
                            <path
                              d="M19 8.839l-7.77 3.885a2.75 2.75 0 01-2.46 0L1 8.839V14a2 2 0 002 2h14a2 2 0 002-2V8.839z"
                            />
                          </svg>
                        </div>
                        <input
                          type="email"
                          id="email-address"
                          formControlName="email"
                          class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          [class.ring-red-300]="
                            checkoutForm.get('email')?.touched && checkoutForm.get('email')?.invalid
                          "
                          [class.text-red-900]="
                            checkoutForm.get('email')?.touched && checkoutForm.get('email')?.invalid
                          "
                          [class.placeholder-red-300]="
                            checkoutForm.get('email')?.touched && checkoutForm.get('email')?.invalid
                          "
                        />
                      </div>
                      @if (checkoutForm.get('email')?.touched && checkoutForm.get('email')?.invalid)
                      {
                      <p class="mt-2 text-sm text-red-600">Valid email is required</p>
                      }
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
                        <div class="relative mt-1 rounded-md shadow-sm">
                          <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                          >
                            <svg
                              class="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="full-name"
                            formControlName="fullName"
                            class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            [class.ring-red-300]="
                              checkoutForm.get('fullName')?.touched &&
                              checkoutForm.get('fullName')?.invalid
                            "
                          />
                        </div>
                        @if (checkoutForm.get('fullName')?.touched &&
                        checkoutForm.get('fullName')?.invalid) {
                        <p class="mt-2 text-sm text-red-600">Name is required</p>
                        }
                      </div>

                      <div class="sm:col-span-3">
                        <label for="address" class="block text-sm font-medium text-gray-700"
                          >Address</label
                        >
                        <div class="relative mt-1 rounded-md shadow-sm">
                          <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                          >
                            <svg
                              class="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="address"
                            formControlName="address"
                            class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            [class.ring-red-300]="
                              checkoutForm.get('address')?.touched &&
                              checkoutForm.get('address')?.invalid
                            "
                          />
                        </div>
                        @if (checkoutForm.get('address')?.touched &&
                        checkoutForm.get('address')?.invalid) {
                        <p class="mt-2 text-sm text-red-600">Address is required</p>
                        }
                      </div>

                      <div class="sm:col-span-1">
                        <label for="city" class="block text-sm font-medium text-gray-700"
                          >City</label
                        >
                        <div class="relative mt-1 rounded-md shadow-sm">
                          <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                          >
                            <svg
                              class="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h6v4H7V5zm0 6h6v4H7v-4z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="city"
                            formControlName="city"
                            class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            [class.ring-red-300]="
                              checkoutForm.get('city')?.touched && checkoutForm.get('city')?.invalid
                            "
                          />
                        </div>
                        @if (checkoutForm.get('city')?.touched && checkoutForm.get('city')?.invalid)
                        {
                        <p class="mt-2 text-sm text-red-600">Required</p>
                        }
                      </div>

                      <div class="sm:col-span-1">
                        <label for="postal-code" class="block text-sm font-medium text-gray-700"
                          >Zip Code</label
                        >
                        <div class="relative mt-1 rounded-md shadow-sm">
                          <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                          >
                            <svg
                              class="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="postal-code"
                            formControlName="zipCode"
                            class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            [class.ring-red-300]="
                              checkoutForm.get('zipCode')?.touched &&
                              checkoutForm.get('zipCode')?.invalid
                            "
                          />
                        </div>
                        @if (checkoutForm.get('zipCode')?.touched &&
                        checkoutForm.get('zipCode')?.invalid) {
                        <p class="mt-2 text-sm text-red-600">Required</p>
                        }
                      </div>
                    </div>
                  </div>

                  <!-- Delivery Method -->
                  <div class="mt-10">
                    <h3 class="text-lg font-medium text-gray-900">Delivery method</h3>
                    <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      <!-- Standard -->
                      <label
                        class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                        [class.border-indigo-500]="deliveryMethod() === 'standard'"
                        [class.ring-2]="deliveryMethod() === 'standard'"
                        [class.ring-indigo-500]="deliveryMethod() === 'standard'"
                        [class.border-gray-300]="deliveryMethod() !== 'standard'"
                        (click)="setDeliveryMethod('standard')"
                      >
                        <span class="flex flex-1">
                          <span class="flex flex-col">
                            <span class="block text-sm font-medium text-gray-900">Standard</span>
                            <span class="mt-1 flex items-center text-sm text-gray-500"
                              >4–10 business days</span
                            >
                            <span class="mt-6 text-sm font-medium text-gray-900">$5.00</span>
                          </span>
                        </span>
                        <span
                          class="h-5 w-5 text-indigo-600"
                          [class.invisible]="deliveryMethod() !== 'standard'"
                        >
                          <svg
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                        <span
                          class="pointer-events-none absolute -inset-px rounded-lg border-2"
                          aria-hidden="true"
                          [class.border-indigo-500]="deliveryMethod() === 'standard'"
                          [class.border-transparent]="deliveryMethod() !== 'standard'"
                        ></span>
                      </label>

                      <!-- Express -->
                      <label
                        class="relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                        [class.border-indigo-500]="deliveryMethod() === 'express'"
                        [class.ring-2]="deliveryMethod() === 'express'"
                        [class.ring-indigo-500]="deliveryMethod() === 'express'"
                        [class.border-gray-300]="deliveryMethod() !== 'express'"
                        (click)="setDeliveryMethod('express')"
                      >
                        <span class="flex flex-1">
                          <span class="flex flex-col">
                            <span class="block text-sm font-medium text-gray-900">Express</span>
                            <span class="mt-1 flex items-center text-sm text-gray-500"
                              >2–5 business days</span
                            >
                            <span class="mt-6 text-sm font-medium text-gray-900">$15.00</span>
                          </span>
                        </span>
                        <span
                          class="h-5 w-5 text-indigo-600"
                          [class.invisible]="deliveryMethod() !== 'express'"
                        >
                          <svg
                            class="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                              clip-rule="evenodd"
                            />
                          </svg>
                        </span>
                        <span
                          class="pointer-events-none absolute -inset-px rounded-lg border-2"
                          aria-hidden="true"
                          [class.border-indigo-500]="deliveryMethod() === 'express'"
                          [class.border-transparent]="deliveryMethod() !== 'express'"
                        ></span>
                      </label>
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
                        <div class="relative mt-1 rounded-md shadow-sm">
                          <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                          >
                            <svg
                              class="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M1 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V8zM2 10a1 1 0 011-1h14a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1v-6z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="card-number"
                            formControlName="cardNumber"
                            class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="0000 0000 0000 0000"
                            [class.ring-red-300]="
                              checkoutForm.get('cardNumber')?.touched &&
                              checkoutForm.get('cardNumber')?.invalid
                            "
                          />
                        </div>
                        @if (checkoutForm.get('cardNumber')?.touched &&
                        checkoutForm.get('cardNumber')?.invalid) {
                        <p class="mt-2 text-sm text-red-600">Valid card number is required</p>
                        }
                      </div>

                      <div class="col-span-2 sm:col-span-3">
                        <label for="expiration-date" class="block text-sm font-medium text-gray-700"
                          >Expiration date (MM/YY)</label
                        >
                        <div class="relative mt-1 rounded-md shadow-sm">
                          <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                          >
                            <svg
                              class="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="expiration-date"
                            formControlName="expiry"
                            class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="MM/YY"
                            [class.ring-red-300]="
                              checkoutForm.get('expiry')?.touched &&
                              checkoutForm.get('expiry')?.invalid
                            "
                          />
                        </div>
                        @if (checkoutForm.get('expiry')?.touched &&
                        checkoutForm.get('expiry')?.invalid) {
                        <p class="mt-2 text-sm text-red-600">Required</p>
                        }
                      </div>

                      <div>
                        <label for="cvc" class="block text-sm font-medium text-gray-700">CVC</label>
                        <div class="relative mt-1 rounded-md shadow-sm">
                          <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                          >
                            <svg
                              class="h-5 w-5 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                                clip-rule="evenodd"
                              />
                            </svg>
                          </div>
                          <input
                            type="text"
                            id="cvc"
                            formControlName="cvv"
                            class="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="123"
                            [class.ring-red-300]="
                              checkoutForm.get('cvv')?.touched && checkoutForm.get('cvv')?.invalid
                            "
                          />
                        </div>
                        @if (checkoutForm.get('cvv')?.touched && checkoutForm.get('cvv')?.invalid) {
                        <p class="mt-2 text-sm text-red-600">Required</p>
                        }
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

  deliveryMethod = signal<'standard' | 'express'>('standard');
  shippingCost = computed(() => (this.deliveryMethod() === 'express' ? 15.0 : 5.0));
  total = computed(() => this.cartTotal() + this.shippingCost());

  checkoutForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
  });

  setDeliveryMethod(method: 'standard' | 'express') {
    this.deliveryMethod.set(method);
  }

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
