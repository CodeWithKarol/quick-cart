import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListPage } from './product-list-page';
import { ProductService } from '../../core/services/product-service';
import { CartService } from '../../core/services/cart-service';
import { of } from 'rxjs';
import { Product } from '../../core/models/product';
import { vi } from 'vitest';

describe('ProductListPage', () => {
  let component: ProductListPage;
  let fixture: ComponentFixture<ProductListPage>;
  let cartServiceSpy: any;
  let productServiceSpy: any;

  const mockProducts: Product[] = [
    { id: 1, name: 'P1', price: 10, description: 'D1', imageUrl: 'img1', category: 'C1' },
    { id: 2, name: 'P2', price: 20, description: 'D2', imageUrl: 'img2', category: 'C2' },
  ];

  beforeEach(async () => {
    cartServiceSpy = { addToCart: vi.fn() };
    productServiceSpy = { getProducts: vi.fn().mockReturnValue(of(mockProducts)) };

    await TestBed.configureTestingModule({
      imports: [ProductListPage],
      providers: [
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
    expect(component.products().length).toBe(2);
  });

  it('should filter products by search query', () => {
    component.searchQuery.set('P1');
    fixture.detectChanges();
    expect(component.filteredProducts().length).toBe(1);
    expect(component.filteredProducts()[0].name).toBe('P1');
  });

  it('should filter products by category', () => {
    component.selectedCategory.set('C2');
    fixture.detectChanges();
    expect(component.filteredProducts().length).toBe(1);
    expect(component.filteredProducts()[0].name).toBe('P2');
  });

  it('should add to cart', () => {
    component.onAddToCart(mockProducts[0]);
    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(mockProducts[0]);
  });
});
