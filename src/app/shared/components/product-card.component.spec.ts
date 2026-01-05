import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductCardComponent } from './product-card.component';
import { Product } from '../../core/models/product.model';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

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
      imports: [ProductCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
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
