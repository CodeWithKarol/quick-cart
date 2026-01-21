import { Component, inject, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../cart/services/cart-store';
import { CheckoutOrderSummaryComponent } from '../../components/checkout-order-summary/checkout-order-summary.component';
import { CheckoutStepsComponent } from '../../components/checkout-steps/checkout-steps.component';
import { CheckoutPersonalInfoComponent } from '../../components/checkout-personal-info/checkout-personal-info.component';
import { CheckoutDeliveryComponent } from '../../components/checkout-delivery/checkout-delivery.component';
import { CheckoutPaymentComponent } from '../../components/checkout-payment/checkout-payment.component';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CheckoutOrderSummaryComponent,
    CheckoutStepsComponent,
    CheckoutPersonalInfoComponent,
    CheckoutDeliveryComponent,
    CheckoutPaymentComponent,
  ],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
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
    this.checkoutForm.markAllAsTouched();
  }

  setDeliveryMethod(method: 'standard' | 'express') {
    this.deliveryMethod.set(method);
  }

  goToStep(step: (typeof this.steps)[number]) {
    // Validation check before moving to next step if moving forward
    if (this.currentStep() === 'information' && step !== 'information') {
      const infoControls = ['fullName', 'email', 'address', 'city', 'zipCode'];
      const isInfoValid = infoControls.every((c) => this.checkoutForm.get(c)?.valid);
      if (!isInfoValid) {
        infoControls.forEach((c) => this.checkoutForm.get(c)?.markAsTouched());
        return; // Stop navigation
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
