import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductDetails } from './product-details.component';
import { Product } from '../../models/product';

describe('ProductDetails', () => {
  let component: ProductDetails;
  let fixture: ComponentFixture<ProductDetails>;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 99.99,
    description: 'A great product',
    imageUrl: 'img.jpg',
    category: 'Home',
    rating: 4.5,
    reviews: 10,
    colors: [
      { name: 'Red', class: 'bg-red-500', selectedClass: 'ring-red-500' },
      { name: 'Blue', class: 'bg-blue-500', selectedClass: 'ring-blue-500' },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetails);
    component = fixture.componentInstance;

    // Set required product input
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product name, price, and description', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Test Product');
    expect(compiled.textContent).toContain('99.99');
    expect(compiled.textContent).toContain('A great product');
  });

  it('should render color buttons if product has colors', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button[title]');
    expect(buttons.length).toBe(2);
    expect(buttons[0].getAttribute('title')).toBe('Red');
    expect(buttons[1].getAttribute('title')).toBe('Blue');
  });

  it('should emit selectedColorChange when a color button is clicked', () => {
    let emittedColor: string | undefined;
    component.selectedColorChange.subscribe((color) => (emittedColor = color));

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = compiled.querySelectorAll('button[title]');
    (buttons[1] as HTMLElement).click();

    expect(emittedColor).toBe('Blue');
  });

  it('should emit addToCart when add to cart button is clicked', () => {
    let emittedProduct: Product | undefined;
    component.addToCart.subscribe((product) => (emittedProduct = product));

    const compiled = fixture.nativeElement as HTMLElement;
    // Find add to cart button by text content
    const buttons = Array.from(compiled.querySelectorAll('button'));
    const addToCartBtn = buttons.find((b) => b.textContent?.trim().toLowerCase() === 'add to cart');

    addToCartBtn?.click();
    expect(emittedProduct).toEqual(mockProduct);
  });

  it('should emit toggleWishlist when wishlist button is clicked', () => {
    let emittedProduct: Product | undefined;
    component.toggleWishlist.subscribe((product) => (emittedProduct = product));

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll('button'));
    // Find the button with 'Add to wishlist' screen reader text
    const wishlistBtn = buttons.find((b) =>
      b.textContent?.trim().toLowerCase().includes('add to wishlist'),
    );

    wishlistBtn?.click();
    expect(emittedProduct).toEqual(mockProduct);
  });
});
