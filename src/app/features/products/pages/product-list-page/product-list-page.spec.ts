import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ProductListPage } from './product-list-page';
import { ProductService } from '../../services/product-service';
import { CartService } from '../../../cart/services/cart-service';
import { of } from 'rxjs';
import { Product } from '../../models/product';
import { vi } from 'vitest';
import { By } from '@angular/platform-browser';

describe('ProductListPage', () => {
  let component: ProductListPage;
  let fixture: ComponentFixture<ProductListPage>;
  let cartServiceSpy: any;
  let productServiceSpy: any;

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Alpha Product',
      price: 10,
      description: 'First excellent item',
      imageUrl: 'img1',
      category: 'Electronics',
      rating: 4,
      reviews: 5,
    },
    {
      id: 2,
      name: 'Beta Product',
      price: 20,
      description: 'Second amazing item',
      imageUrl: 'img2',
      category: 'Clothing',
      rating: 3,
      reviews: 8,
    },
    {
      id: 3,
      name: 'Gamma Gadget',
      price: 30,
      description: 'Third cool electronics',
      imageUrl: 'img3',
      category: 'Electronics',
      rating: 5,
      reviews: 10,
    },
  ];

  beforeEach(async () => {
    cartServiceSpy = { addToCart: vi.fn() };
    productServiceSpy = { getProducts: vi.fn().mockReturnValue(of(mockProducts)) };

    await TestBed.configureTestingModule({
      imports: [ProductListPage],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products', () => {
    expect(component.products().length).toBe(3);
    // Initial categories check
    expect(component.categories()).toEqual(['Electronics', 'Clothing']);
  });

  it('should filter products by search query (name case insensitive)', () => {
    component.searchQuery.set('alpha');
    fixture.detectChanges();
    expect(component.filteredProducts().length).toBe(1);
    expect(component.filteredProducts()[0].name).toBe('Alpha Product');
  });

  it('should filter products by search query (description)', () => {
    component.searchQuery.set('amazing');
    fixture.detectChanges();
    expect(component.filteredProducts().length).toBe(1);
    expect(component.filteredProducts()[0].name).toBe('Beta Product');
  });

  it('should filter products by category', () => {
    component.selectedCategory.set('Electronics');
    fixture.detectChanges();
    expect(component.filteredProducts().length).toBe(2);
    const names = component.filteredProducts().map((p) => p.name);
    expect(names).toContain('Alpha Product');
    expect(names).toContain('Gamma Gadget');
  });

  it('should filter by both search and category', () => {
    component.selectedCategory.set('Electronics');
    component.searchQuery.set('Gamma');
    fixture.detectChanges();

    expect(component.filteredProducts().length).toBe(1);
    expect(component.filteredProducts()[0].name).toBe('Gamma Gadget');
  });

  it('should show empty state when no matches found', () => {
    component.searchQuery.set('Nonexistent');
    fixture.detectChanges();
    expect(component.filteredProducts().length).toBe(0);

    // Check if "No products found" message is displayed
    const debugElement = fixture.debugElement.query(By.css('h3'));
    expect(debugElement.nativeElement.textContent).toContain('No products found');
  });

  it('should reset filters', () => {
    component.searchQuery.set('Alpha');
    component.selectedCategory.set('Electronics');
    fixture.detectChanges();
    expect(component.filteredProducts().length).toBe(1);

    component.resetFilters();
    fixture.detectChanges();

    expect(component.searchQuery()).toBe('');
    expect(component.selectedCategory()).toBe('');
    expect(component.filteredProducts().length).toBe(3);
  });

  it('should update search via input event', () => {
    const inputEvent = { target: { value: 'Beta' } } as unknown as Event;
    component.updateSearch(inputEvent);
    fixture.detectChanges();

    expect(component.searchQuery()).toBe('Beta');
    expect(component.filteredProducts().length).toBe(1);
    expect(component.filteredProducts()[0].name).toBe('Beta Product');
  });

  it('should update category via change event', () => {
    const changeEvent = { target: { value: 'Clothing' } } as unknown as Event;
    component.updateCategory(changeEvent);
    fixture.detectChanges();

    expect(component.selectedCategory()).toBe('Clothing');
    expect(component.filteredProducts().length).toBe(1);
    expect(component.filteredProducts()[0].name).toBe('Beta Product');
  });

  it('should add to cart', () => {
    component.onAddToCart(mockProducts[0]);
    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(mockProducts[0]);
  });
});
