import { TestBed } from '@angular/core/testing';
import { ProductService } from './product-service';
import { vi } from 'vitest';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products', () => {
    let products: any[] = [];
    service.getProducts().subscribe((data) => {
      products = data;
    });

    vi.advanceTimersByTime(500);

    expect(products.length).toBeGreaterThan(0);
    expect(products[0].name).toBeDefined();
  });

  it('should return product by id', () => {
    let product: any;
    service.getProductById(1).subscribe((data) => {
      product = data;
    });

    vi.advanceTimersByTime(300);

    expect(product).toBeDefined();
    expect(product.id).toBe(1);
  });

  it('should return undefined for non-existent product id', () => {
    let product: any;
    service.getProductById(999).subscribe((data) => {
      product = data;
    });

    vi.advanceTimersByTime(300);

    expect(product).toBeUndefined();
  });
});
