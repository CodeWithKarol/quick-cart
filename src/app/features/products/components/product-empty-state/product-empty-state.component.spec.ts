import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductEmptyState } from './product-empty-state.component';
import { Product } from '../../models/product';

describe('ProductEmptyState', () => {
  let component: ProductEmptyState;
  let fixture: ComponentFixture<ProductEmptyState>;

  const mockTrendingProducts: Product[] = [
    {
      id: 1,
      name: 'Trending 1',
      price: 50,
      description: 'Desc 1',
      imageUrl: 'img1.jpg',
      category: 'Cat',
      rating: 5,
      reviews: 10,
    },
    {
      id: 2,
      name: 'Trending 2',
      price: 150,
      description: 'Desc 2',
      imageUrl: 'img2.jpg',
      category: 'Cat',
      rating: 4,
      reviews: 5,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductEmptyState],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductEmptyState);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('trendingProducts', mockTrendingProducts);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render empty state texts', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('No products found');
    expect(compiled.textContent).toContain('Clear all filters');
  });

  it('should render trending products if array has items', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h4')?.textContent).toContain('You might also like');

    // There are two items, which are rendered as buttons containing img and text
    const trendingButtons = compiled.querySelectorAll('button.group');
    expect(trendingButtons.length).toBe(2);
    expect(trendingButtons[0].textContent).toContain('Trending 1');
    expect(trendingButtons[1].textContent).toContain('Trending 2');
  });

  it('should not render trending products section if array is empty', () => {
    fixture.componentRef.setInput('trendingProducts', []);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h4')).toBeNull();
    const trendingButtons = compiled.querySelectorAll('button.group');
    expect(trendingButtons.length).toBe(0);
  });

  it('should emit resetFilters when clear button is clicked', () => {
    let resetEmitted = false;
    component.resetFilters.subscribe(() => (resetEmitted = true));

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll('button'));
    const clearBtn = buttons.find(
      (b) => b.textContent?.trim().toLowerCase() === 'clear all filters',
    );

    clearBtn?.click();
    expect(resetEmitted).toBe(true);
  });

  it('should emit addToCart when a trending product is clicked', () => {
    let emittedProduct: Product | undefined;
    component.addToCart.subscribe((product) => (emittedProduct = product));

    const compiled = fixture.nativeElement as HTMLElement;
    const trendingButtons = compiled.querySelectorAll('button.group');
    (trendingButtons[0] as HTMLElement).click();

    expect(emittedProduct).toEqual(mockTrendingProducts[0]);
  });
});
