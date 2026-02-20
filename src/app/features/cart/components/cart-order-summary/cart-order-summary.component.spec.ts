import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartOrderSummaryComponent } from './cart-order-summary.component';
import { provideRouter } from '@angular/router';

describe('CartOrderSummaryComponent', () => {
  let component: CartOrderSummaryComponent;
  let fixture: ComponentFixture<CartOrderSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartOrderSummaryComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CartOrderSummaryComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('subtotal', 100);
    fixture.componentRef.setInput('shipping', 15);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display calculations correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Convert to text content and assert
    const text = compiled.textContent || '';

    // Because Angular currency pipe adds the symbol, we can check for values
    expect(text).toContain('$100.00'); // Subtotal
    expect(text).toContain('$15.00'); // Shipping
    expect(text).toContain('$115.00'); // Total computed from 100+15
  });
});
