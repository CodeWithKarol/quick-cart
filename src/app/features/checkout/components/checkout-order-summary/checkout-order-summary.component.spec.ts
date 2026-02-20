import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CheckoutOrderSummaryComponent } from './checkout-order-summary.component';
import { provideRouter } from '@angular/router';

describe('CheckoutOrderSummaryComponent', () => {
  let component: CheckoutOrderSummaryComponent;
  let fixture: ComponentFixture<CheckoutOrderSummaryComponent>;

  const mockCartItems = [
    {
      product: {
        id: 1,
        name: 'Test Product',
        price: 99.99,
        description: 'Desc',
        imageUrl: 'img.jpg',
        category: 'Cat',
        rating: 4.5,
        reviews: 10,
      },
      quantity: 2,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutOrderSummaryComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(CheckoutOrderSummaryComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('cartItems', mockCartItems);
    fixture.componentRef.setInput('cartTotal', 199.98);
    fixture.componentRef.setInput('shippingCost', 5.0);
    fixture.componentRef.setInput('total', 204.98);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render items correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('li');
    expect(items.length).toBe(1);

    const text = compiled.textContent || '';
    expect(text).toContain('Test Product');
    expect(text).toContain('x2');
  });

  it('should render totals correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const text = compiled.textContent || '';

    expect(text).toContain('$199.98'); // Subtotal
    expect(text).toContain('$5.00'); // Shipping
    expect(text).toContain('$204.98'); // Total
  });
});
