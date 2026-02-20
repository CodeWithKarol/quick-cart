import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductFilters } from './product-filters.component';

describe('ProductFilters', () => {
  let component: ProductFilters;
  let fixture: ComponentFixture<ProductFilters>;

  const mockCategories = ['Electronics', 'Clothing', 'Home'];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFilters],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductFilters);
    component = fixture.componentInstance;

    // Set required input
    fixture.componentRef.setInput('categories', mockCategories);
    fixture.componentRef.setInput('selectedCategory', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render categories correctly', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    // Categories are rendered as li elements inside ul
    const lis = compiled.querySelectorAll('ul li');
    expect(lis.length).toBe(4); // 1 for All Categories + 3 categories

    expect(lis[0].textContent?.trim()).toBe('All Categories');
    expect(lis[1].textContent?.trim()).toBe('Electronics');
    expect(lis[2].textContent?.trim()).toBe('Clothing');
  });

  it('should emit categoryChange when a category is clicked', () => {
    let emittedCategory: string | undefined;
    component.categoryChange.subscribe((cat) => (emittedCategory = cat));

    const compiled = fixture.nativeElement as HTMLElement;
    const lis = compiled.querySelectorAll('ul li');

    // Click on Electronics (index 1)
    (lis[1] as HTMLElement).click();

    expect(emittedCategory).toBe('Electronics');
  });

  it('should emit minPriceChange when min price input is updated', () => {
    let emittedPrice: number | null | undefined;
    component.minPriceChange.subscribe((price) => (emittedPrice = price));

    const compiled = fixture.nativeElement as HTMLElement;
    const minInput = compiled.querySelector('input[placeholder="Min"]') as HTMLInputElement;

    minInput.value = '50';
    minInput.dispatchEvent(new Event('input'));

    expect(emittedPrice).toBe(50);
  });

  it('should emit ratingChange when rating ratio is changed', () => {
    let emittedRating: number | undefined;
    component.ratingChange.subscribe((rating) => (emittedRating = rating));

    const compiled = fixture.nativeElement as HTMLElement;
    // First radio is 4+ stars
    const radios = compiled.querySelectorAll('input[type="radio"]');
    (radios[0] as HTMLElement).click();
    (radios[0] as HTMLInputElement).dispatchEvent(new Event('change'));

    expect(emittedRating).toBe(4);
  });

  it('should emit resetFilters when reset button is clicked', () => {
    let resetEmitted = false;
    component.resetFilters.subscribe(() => (resetEmitted = true));

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll('button'));
    const resetBtn = buttons.find((b) => b.textContent?.trim().toLowerCase() === 'reset options');

    resetBtn?.click();
    expect(resetEmitted).toBe(true);
  });
});
