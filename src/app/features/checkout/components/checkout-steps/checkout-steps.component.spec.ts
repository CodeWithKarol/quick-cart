import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutStepsComponent } from './checkout-steps.component';

describe('CheckoutStepsComponent', () => {
  let component: CheckoutStepsComponent;
  let fixture: ComponentFixture<CheckoutStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutStepsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutStepsComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('steps', ['info', 'delivery', 'payment']);
    fixture.componentRef.setInput('currentStep', 'delivery');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all steps', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const steps = compiled.querySelectorAll('li');
    expect(steps.length).toBe(3);

    expect(steps[0].textContent).toContain('info');
    expect(steps[1].textContent).toContain('delivery');
    expect(steps[2].textContent).toContain('payment');
  });

  it('should mark current step differently', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const steps = compiled.querySelectorAll('li');

    // The current step 'delivery' (index 1) should have aria-current
    const currentA = steps[1].querySelector('a');
    expect(currentA?.getAttribute('aria-current')).toBe('step');
  });

  it('should emit stepClick for previous steps', () => {
    let emitted: string | undefined;
    component.stepClick.subscribe((step) => {
      emitted = step;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const steps = compiled.querySelectorAll('li');

    // 'info' is previous, should be clickable
    const prevA = steps[0].querySelector('a') as HTMLElement;
    prevA.click();

    expect(emitted).toBe('info');
  });

  it('should not emit stepClick for current step', () => {
    let emitted: string | undefined;
    component.stepClick.subscribe((step) => {
      emitted = step;
    });

    const compiled = fixture.nativeElement as HTMLElement;
    const steps = compiled.querySelectorAll('li');

    // 'delivery' is current, click should not emit
    const currentA = steps[1].querySelector('a') as HTMLElement;
    if (currentA) currentA.click();

    expect(emitted).toBeUndefined();
  });
});
