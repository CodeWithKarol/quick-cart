import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home-page';
import { ProductService } from '../../../products/services/product-api';
import { CartService } from '../../../cart/services/cart-store';
import { of } from 'rxjs';
import { Product } from '../../../products/models/product';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let productServiceSpy: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cartServiceSpy: any;

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Test Product 1',
      price: 10,
      description: 'Desc',
      imageUrl: 'img1.jpg',
      category: 'Cat',
      rating: 4,
      reviews: 10,
    },
    {
      id: 2,
      name: 'Test Product 2',
      price: 20,
      description: 'Desc',
      imageUrl: 'img2.jpg',
      category: 'Cat',
      rating: 5,
      reviews: 20,
    },
  ];

  beforeEach(async () => {
    productServiceSpy = {
      getProducts: vi.fn().mockReturnValue(of(mockProducts)),
    };

    cartServiceSpy = {
      addToCart: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
      ],
    })
      .overrideComponent(HomePage, {
        set: {
          imports: [], // Bypass child components
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load featured products', () => {
    expect(productServiceSpy.getProducts).toHaveBeenCalled();
    // Assuming toSignal is working correctly:
    expect(component.featuredProducts().length).toBe(2);
    expect(component.featuredProducts()[0].name).toBe('Test Product 1');
  });

  it('should handle addToCart', () => {
    component.onAddToCart(mockProducts[0]);
    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(mockProducts[0]);
  });

  it('should handle quickView', () => {
    expect(component.selectedQuickViewProduct()).toBeUndefined();
    component.onQuickView(mockProducts[1]);
    expect(component.selectedQuickViewProduct()).toEqual(mockProducts[1]);
  });

  it('should close quickView', () => {
    component.onQuickView(mockProducts[0]);
    expect(component.selectedQuickViewProduct()).toEqual(mockProducts[0]);

    component.closeQuickView();
    expect(component.selectedQuickViewProduct()).toBeUndefined();
  });
});
