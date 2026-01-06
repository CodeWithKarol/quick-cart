import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductCard } from './product-card';
import { Product } from '../../models/product';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 10.0,
    description: 'Test Description',
    imageUrl: 'test.jpg',
    category: 'Test',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product details', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Test Product');
    expect(compiled.querySelector('.price')?.textContent).toContain('$10.00');
  });

  it('should emit addToCart event when button is clicked', () => {
    let emittedProduct: Product | undefined;
    component.addToCart.subscribe((p) => (emittedProduct = p));

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(emittedProduct).toEqual(mockProduct);
  });
});
