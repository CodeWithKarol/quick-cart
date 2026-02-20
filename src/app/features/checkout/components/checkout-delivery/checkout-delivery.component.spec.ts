import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutDeliveryComponent } from './checkout-delivery.component';

describe('CheckoutDeliveryComponent', () => {
  let component: CheckoutDeliveryComponent;
  let fixture: ComponentFixture<CheckoutDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutDeliveryComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutDeliveryComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('deliveryMethod', 'standard');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render standard as selected', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.cursor-pointer');
    expect(items.length).toBe(2);
    expect(items[0].classList.contains('border-primary-900')).toBe(true);
    expect(items[1].classList.contains('border-gray-300')).toBe(true);
  });

  it('should emit deliveryMethodChange when clicking options', () => {
    let emitted: 'standard' | 'express' | undefined;
    component.deliveryMethodChange.subscribe((val) => {
      emitted = val;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('.cursor-pointer') as NodeListOf<HTMLElement>;

    // Click express
    items[1].click();
    expect(emitted).toBe('express');

    // Click standard
    items[0].click();
    expect(emitted).toBe('standard');
  });

  it('should emit back event', () => {
    let emitted = false;
    component.back.subscribe(() => {
      emitted = true;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    buttons[0].click(); // First button is Back
    expect(emitted).toBe(true);
  });

  it('should emit continue event', () => {
    let emitted = false;
    component.continue.subscribe(() => {
      emitted = true;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button');
    buttons[1].click(); // Second button is Continue
    expect(emitted).toBe(true);
  });
});
