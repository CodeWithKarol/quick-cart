import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutPersonalInfoComponent } from './checkout-personal-info.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

describe('CheckoutPersonalInfoComponent', () => {
  let component: CheckoutPersonalInfoComponent;
  let fixture: ComponentFixture<CheckoutPersonalInfoComponent>;
  let fb: FormBuilder;
  let form: FormGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutPersonalInfoComponent, ReactiveFormsModule],
    }).compileComponents();

    fb = TestBed.inject(FormBuilder);
    form = fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zipCode: ['', Validators.required],
    });

    fixture = TestBed.createComponent(CheckoutPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('form', form);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render form fields', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('input[formControlName="email"]')).toBeTruthy();
    expect(compiled.querySelector('input[formControlName="fullName"]')).toBeTruthy();
    expect(compiled.querySelector('input[formControlName="address"]')).toBeTruthy();
    expect(compiled.querySelector('input[formControlName="city"]')).toBeTruthy();
    expect(compiled.querySelector('input[formControlName="zipCode"]')).toBeTruthy();
  });

  it('should emit fillMockData event when button is clicked', () => {
    let emitted = false;
    component.fillMockData.subscribe(() => {
      emitted = true;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    // Button index 2 is Use mock data (after Apple Pay and Google Pay)
    buttons[2].click();

    expect(emitted).toBe(true);
  });

  it('should emit continue event when continue button is clicked', () => {
    let emitted = false;
    component.continue.subscribe(() => {
      emitted = true;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    // The last button is Continue to Shipping
    buttons[buttons.length - 1].click();

    expect(emitted).toBe(true);
  });
});
