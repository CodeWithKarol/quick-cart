import { Component, inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart-service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="bg-gray-50 min-h-screen pt-16 pb-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
        <!-- Order Summary (Right Column on Desktop) -->
        <div class="mt-10 lg:mt-0 lg:col-start-2">
          <div class="lg:sticky lg:top-20">
            <h2 class="text-lg font-medium text-gray-900">Order summary</h2>

            <div class="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 class="sr-only">Items in your cart</h3>
              <ul role="list" class="divide-y divide-gray-200">
                @for (item of cartItems(); track item.product.id) {
                  <li class="flex py-6 px-4 sm:px-6">
                    <div class="flex-shrink-0">
                      <img
                        [src]="item.product.imageUrl"
                        [alt]="item.product.name"
                        class="w-20 rounded-md"
                      />
                    </div>

                    <div class="ml-6 flex flex-1 flex-col">
                      <div class="flex">
                        <div class="min-w-0 flex-1">
                          <h4 class="text-sm">
                            <a
                              [href]="'/products/' + item.product.id"
                              class="font-medium text-gray-700 hover:text-gray-800"
                              >{{ item.product.name }}</a
                            >
                          </h4>
                          <p class="mt-1 text-sm text-gray-500">{{ item.product.category }}</p>
                        </div>

                        <div class="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            class="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                          >
                            <span class="sr-only">Remove</span>
                            <!-- Trash Icon could go here, but maybe just display quantity -->
                            <span class="text-sm font-medium text-gray-900"
                              >x{{ item.quantity }}</span
                            >
                          </button>
                        </div>
                      </div>

                      <div class="flex flex-1 items-end justify-between pt-2">
                        <p class="mt-1 text-sm font-medium text-gray-900">
                          {{ item.product.price | currency }}
                        </p>
                      </div>
                    </div>
                  </li>
                }
              </ul>
              <dl class="border-t border-gray-200 py-6 px-4 space-y-6 sm:px-6">
                <div class="flex items-center justify-between">
                  <dt class="text-sm">Subtotal</dt>
                  <dd class="text-sm font-medium text-gray-900">{{ cartTotal() | currency }}</dd>
                </div>
                <div class="flex items-center justify-between">
                  <dt class="text-sm">Shipping</dt>
                  <dd class="text-sm font-medium text-gray-900">{{ shippingCost() | currency }}</dd>
                </div>
                <div class="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt class="text-base font-medium">Total</dt>
                  <dd class="text-base font-medium text-gray-900">{{ total() | currency }}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <!-- Checkout Form (Left Column) -->
        <div class="mt-10 lg:mt-0 lg:col-start-1">
          <!-- Steps -->
          <nav aria-label="Progress" class="mb-8">
            <ol role="list" class="space-y-4 md:flex md:space-y-0 md:space-x-8">
              @for (step of steps; track step; let i = $index) {
                <li class="md:flex-1">
                  @if (currentStep() === step) {
                    <a
                      class="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4"
                      aria-current="step"
                    >
                      <span class="text-sm font-medium text-indigo-600">Step {{ i + 1 }}</span>
                      <span class="text-sm font-medium text-gray-900 capitalize">{{ step }}</span>
                    </a>
                  } @else if (steps.indexOf(currentStep()) > i) {
                    <a
                      (click)="goToStep(step)"
                      class="group flex flex-col border-l-4 border-indigo-600 py-2 pl-4 hover:border-indigo-800 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4 cursor-pointer"
                    >
                      <span class="text-sm font-medium text-indigo-600 group-hover:text-indigo-800"
                        >Step {{ i + 1 }}</span
                      >
                      <span
                        class="text-sm font-medium text-gray-900 group-hover:text-gray-900 capitalize"
                        >{{ step }}</span
                      >
                    </a>
                  } @else {
                    <div
                      class="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 md:border-l-0 md:border-t-4 md:pl-0 md:pt-4"
                    >
                      <span class="text-sm font-medium text-gray-500">Step {{ i + 1 }}</span>
                      <span class="text-sm font-medium text-gray-500 capitalize">{{ step }}</span>
                    </div>
                  }
                </li>
              }
            </ol>
          </nav>

          <form [formGroup]="checkoutForm" (ngSubmit)="onSubmit()">
            @if (currentStep() === 'information') {
              <div class="space-y-6">
                <!-- Express Checkout (Better Buttons) -->
                <div>
                  <div class="mt-6 grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      class="flex w-full items-center justify-center rounded-md border border-transparent bg-black py-2.5 text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      <span class="sr-only">Sign in with Apple</span>
                      <svg class="h-5 w-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12.22 3.4c.5-1.22 1.6-1.9 2.5-1.9.9 0 2 .7 2.5 1.9.5 1.2-.2 2.7-.9 3.5-.7.8-1.8 1.1-2.7 1-.9-.1-1.8-.7-2.3-1.6-.5-1 .1-2.2.9-2.9zm5.3 4.2c-1.3-.8-2.5-.2-3.1.2-.6.4-1.2 1.1-1.2 2.3 0 1.9 1.5 3.5 3.5 3.5 1 0 1.9-.5 2.5-1.1.2-.2.5-.3.8-.3 1 0 2.2 1.1 2.2 1.1s-.4 1.1-.9 2c-.6 1.1-1.4 2.3-2.6 2.3-.6 0-1.1-.2-1.6-.5-.9-.5-2.2-.5-3.1 0-.5.3-1 .5-1.6.5-1.2 0-2.3-1.5-3.2-3.3-1.6-3.2-.3-6.8 2.6-7 1-.1 1.9.6 2.5.6.5 0 1.3-.7 2.3-.7 1 0 1.6.4 1.9.7-1.2.7-2.1 2.2-2.1 3.7 0 1.2.7 2.3 1.7 2.9l.4.1z"
                        ></path>
                      </svg>
                      <span class="ml-2 font-medium">Apple Pay</span>
                    </button>

                    <button
                      type="button"
                      class="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2.5 text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                      <span class="sr-only">Sign in with Google</span>
                      <svg class="h-5 w-auto" fill="currentColor" viewBox="0 0 24 24">
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .533 5.333.533 12S5.867 24 12.48 24c3.44 0 6.333-1.147 8.52-3.173 2.227-2.227 2.907-5.507 2.907-8.16 0-.667-.067-1.293-.187-1.747h-11.24z"
                        ></path>
                      </svg>
                      <span class="ml-2 font-medium">Google Pay</span>
                    </button>
                  </div>
                  <div class="relative mt-6">
                    <div class="absolute inset-0 flex items-center" aria-hidden="true">
                      <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center">
                      <span class="bg-gray-50 px-2 text-sm text-gray-500"
                        >Or continue with email</span
                      >
                    </div>
                  </div>
                </div>

                <!-- Contact Info -->
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Contact information</h3>
                  <div class="mt-4">
                    <label
                      for="email-address"
                      class="block text-sm font-medium leading-6 text-gray-900"
                      >Email address</label
                    >
                    <div class="mt-2">
                      <input
                        type="email"
                        id="email-address"
                        formControlName="email"
                        autocomplete="email"
                        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    @if (checkoutForm.get('email')?.touched && checkoutForm.get('email')?.invalid) {
                      <p class="mt-2 text-sm text-red-600">Valid email is required</p>
                    }
                  </div>
                </div>

                <!-- Shipping Address -->
                <div class="pt-6">
                  <div class="flex items-center justify-between">
                    <h3 class="text-lg font-medium text-gray-900">Shipping address</h3>
                    <button
                      type="button"
                      class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                      (click)="fillMockData()"
                    >
                      Use mock data
                    </button>
                  </div>

                  <div class="mt-4 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6 pl-1">
                    <div class="sm:col-span-6">
                      <label
                        for="full-name"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Full name</label
                      >
                      <div class="mt-2">
                        <input
                          type="text"
                          id="full-name"
                          formControlName="fullName"
                          autocomplete="name"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-6">
                      <label for="address" class="block text-sm font-medium leading-6 text-gray-900"
                        >Address</label
                      >
                      <div class="mt-2">
                        <input
                          type="text"
                          id="address"
                          formControlName="address"
                          autocomplete="street-address"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-2">
                      <label for="city" class="block text-sm font-medium leading-6 text-gray-900"
                        >City</label
                      >
                      <div class="mt-2">
                        <input
                          type="text"
                          id="city"
                          formControlName="city"
                          autocomplete="address-level2"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="sm:col-span-2">
                      <label
                        for="postal-code"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >ZIP / Postal code</label
                      >
                      <div class="mt-2">
                        <input
                          type="text"
                          id="postal-code"
                          formControlName="zipCode"
                          autocomplete="postal-code"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <!-- No State field in original mock, but normally needed. Leaving out for now or adding mock state? Original didn't have it. -->
                  </div>
                </div>

                <div class="pt-6 flex justify-end">
                  <button
                    type="button"
                    (click)="nextStep()"
                    class="rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Continue to Shipping
                  </button>
                </div>
              </div>
            }

            @if (currentStep() === 'shipping') {
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Delivery method</h3>
                  <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <!-- Standard -->
                    <div
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
                      <svg
                        class="h-5 w-5 text-indigo-600"
                        [class.invisible]="deliveryMethod() !== 'standard'"
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
                      <span
                        class="pointer-events-none absolute -inset-px rounded-lg border-2"
                        aria-hidden="true"
                        [class.border-indigo-500]="deliveryMethod() === 'standard'"
                        [class.border-transparent]="deliveryMethod() !== 'standard'"
                      ></span>
                    </div>

                    <!-- Express -->
                    <div
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
                      <svg
                        class="h-5 w-5 text-indigo-600"
                        [class.invisible]="deliveryMethod() !== 'express'"
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
                      <span
                        class="pointer-events-none absolute -inset-px rounded-lg border-2"
                        aria-hidden="true"
                        [class.border-indigo-500]="deliveryMethod() === 'express'"
                        [class.border-transparent]="deliveryMethod() !== 'express'"
                      ></span>
                    </div>
                  </div>
                </div>

                <div class="flex items-center justify-between pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    (click)="prevStep()"
                    class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    <span aria-hidden="true"> &larr;</span> Back to Information
                  </button>
                  <button
                    type="button"
                    (click)="nextStep()"
                    class="rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            }

            @if (currentStep() === 'payment') {
              <div class="space-y-6">
                <div>
                  <h3 class="text-lg font-medium text-gray-900">Payment details</h3>

                  <div class="mt-6 grid grid-cols-4 gap-y-6 gap-x-4">
                    <div class="col-span-4">
                      <label
                        for="card-number"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Card number</label
                      >
                      <div class="mt-2">
                        <input
                          type="text"
                          id="card-number"
                          formControlName="cardNumber"
                          autocomplete="cc-number"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="col-span-2 sm:col-span-3">
                      <label
                        for="expiration-date"
                        class="block text-sm font-medium leading-6 text-gray-900"
                        >Expiration date (MM/YY)</label
                      >
                      <div class="mt-2">
                        <input
                          type="text"
                          id="expiration-date"
                          formControlName="expiry"
                          autocomplete="cc-exp"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div class="col-span-2 sm:col-span-1">
                      <label for="cvc" class="block text-sm font-medium leading-6 text-gray-900"
                        >CVC</label
                      >
                      <div class="mt-2">
                        <input
                          type="text"
                          id="cvc"
                          formControlName="cvv"
                          autocomplete="cc-csc"
                          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Billing Address Toggle -->
                  <div class="mt-6 border-t border-gray-200 pt-6">
                    <div class="flex items-center">
                      <input
                        id="billing-same"
                        type="checkbox"
                        [checked]="billingSameAsShipping()"
                        (change)="billingSameAsShipping.set(!billingSameAsShipping())"
                        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        for="billing-same"
                        class="ml-2 block text-sm font-medium text-gray-900"
                      >
                        Billing address same as shipping
                      </label>
                    </div>

                    @if (!billingSameAsShipping()) {
                      <div class="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div class="sm:col-span-6">
                          <label class="block text-sm font-medium leading-6 text-gray-900"
                            >Billing Full Name</label
                          >
                          <div class="mt-2">
                            <input
                              type="text"
                              formControlName="billingFullName"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div class="sm:col-span-6">
                          <label class="block text-sm font-medium leading-6 text-gray-900"
                            >Billing Address</label
                          >
                          <div class="mt-2">
                            <input
                              type="text"
                              formControlName="billingAddress"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div class="sm:col-span-2">
                          <label class="block text-sm font-medium leading-6 text-gray-900"
                            >City</label
                          >
                          <div class="mt-2">
                            <input
                              type="text"
                              formControlName="billingCity"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div class="sm:col-span-2">
                          <label class="block text-sm font-medium leading-6 text-gray-900"
                            >Zip Code</label
                          >
                          <div class="mt-2">
                            <input
                              type="text"
                              formControlName="billingZipCode"
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>

                <div class="flex items-center justify-between pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    (click)="prevStep()"
                    class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    <span aria-hidden="true"> &larr;</span> Back to Shipping
                  </button>
                  <button
                    type="submit"
                    [disabled]="checkoutForm.invalid || isProcessing"
                    class="rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
                  >
                    {{ isProcessing ? 'Processing...' : 'Pay ' + (total() | currency) }}
                  </button>
                </div>
              </div>
            }
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPage {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private router = inject(Router);

  cartItems = this.cartService.cartItems;
  cartTotal = this.cartService.cartTotal;
  isProcessing = false;

  readonly currentStep = signal<'information' | 'shipping' | 'payment'>('information');
  readonly steps = ['information', 'shipping', 'payment'] as const;

  billingSameAsShipping = signal(true);

  deliveryMethod = signal<'standard' | 'express'>('standard');
  shippingCost = computed(() => (this.deliveryMethod() === 'express' ? 15.0 : 5.0));
  total = computed(() => this.cartTotal() + this.shippingCost());

  checkoutForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', Validators.required],
    address: ['', Validators.required],
    city: ['', Validators.required],
    zipCode: ['', Validators.required],

    // Billing
    billingFullName: [''],
    billingAddress: [''],
    billingCity: [''],
    billingZipCode: [''],

    cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
  });

  fillMockData() {
    this.checkoutForm.patchValue({
      fullName: 'Jane Doe',
      address: '123 Market St',
      city: 'San Francisco',
      zipCode: '94105',
    });
  }

  setDeliveryMethod(method: 'standard' | 'express') {
    this.deliveryMethod.set(method);
  }

  goToStep(step: (typeof this.steps)[number]) {
    if (this.currentStep() === 'information' && step !== 'information') {
      const infoControls = ['fullName', 'email', 'address', 'city', 'zipCode'];
      const isInfoValid = infoControls.every((c) => this.checkoutForm.get(c)?.valid);
      if (!isInfoValid) {
        infoControls.forEach((c) => this.checkoutForm.get(c)?.markAsTouched());
        return;
      }
    }

    this.currentStep.set(step);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  nextStep() {
    const currentIndex = this.steps.indexOf(this.currentStep());
    if (currentIndex < this.steps.length - 1) {
      this.goToStep(this.steps[currentIndex + 1]);
    }
  }

  prevStep() {
    const currentIndex = this.steps.indexOf(this.currentStep());
    if (currentIndex > 0) {
      this.currentStep.set(this.steps[currentIndex - 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      this.isProcessing = true;

      // Simulate API call
      setTimeout(() => {
        this.isProcessing = false;
        this.cartService.clearCart();
        this.router.navigate(['/order-success']);
      }, 1500);
    } else {
      this.checkoutForm.markAllAsTouched();
    }
  }
}
