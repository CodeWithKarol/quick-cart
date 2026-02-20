import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutPaymentComponent } from './checkout-payment.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

describe('CheckoutPaymentComponent', () => {
  let component: CheckoutPaymentComponent;
  let fixture: ComponentFixture<CheckoutPaymentComponent>;
  let fb: FormBuilder;
  let form: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutPaymentComponent, ReactiveFormsModule],
    }).compileComponents();

    fb = TestBed.inject(FormBuilder);
    form = fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      billingFullName: [''],
      billingAddress: [''],
      billingCity: [''],
      billingZipCode: [''],
    });

    fixture = TestBed.createComponent(CheckoutPaymentComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('form', form);
    fixture.componentRef.setInput('billingSameAsShipping', true);
    fixture.componentRef.setInput('total', 100);
    fixture.componentRef.setInput('isProcessing', false);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable pay button when form is invalid', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const payButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(payButton.disabled).toBe(true);
  });

  it('should disable pay button when processing', () => {
    form.patchValue({
      cardNumber: '1234567812345678',
      expiry: '12/25',
      cvv: '123',
    });
    fixture.componentRef.setInput('isProcessing', true);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const payButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(payButton.disabled).toBe(true);
    expect(payButton.textContent).toContain('Processing...');
  });

  it('should enable pay button when form is valid and not processing', () => {
    form.patchValue({
      cardNumber: '1234567812345678',
      expiry: '12/25',
      cvv: '123',
    });
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const payButton = compiled.querySelector('button[type="submit"]') as HTMLButtonElement;
    expect(payButton.disabled).toBe(false);
    expect(payButton.textContent).toContain('Pay $100.00');
  });

  it('should emit changes when billing checkbox is toggled', () => {
    let emitted: boolean | undefined;
    component.billingSameAsShippingChange.subscribe((val) => {
      emitted = val;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const checkbox = compiled.querySelector('input[type="checkbox"]') as HTMLInputElement;

    checkbox.click();
    expect(emitted).toBe(false);
  });

  it('should show billing extra fields when billingSameAsShipping is false', () => {
    fixture.componentRef.setInput('billingSameAsShipping', false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const billingNameInput = compiled.querySelector('input[formControlName="billingFullName"]');
    expect(billingNameInput).toBeTruthy();
  });

  it('should emit back event', () => {
    let emitted = false;
    component.back.subscribe(() => {
      emitted = true;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    buttons[0].click(); // Back button
    expect(emitted).toBe(true);
  });
});
