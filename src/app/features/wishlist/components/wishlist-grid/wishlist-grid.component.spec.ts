import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WishlistGrid } from './wishlist-grid.component';
import { Product } from '../../../products/models/product';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('WishlistGrid', () => {
  let component: WishlistGrid;
  let fixture: ComponentFixture<WishlistGrid>;

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Prod1',
      price: 10,
      category: 'A',
      imageUrl: 'img1',
      description: 'desc1',
      rating: 5,
      reviews: 10,
    },
    {
      id: 2,
      name: 'Prod2',
      price: 20,
      category: 'B',
      imageUrl: 'img2',
      description: 'desc2',
      rating: 4,
      reviews: 5,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistGrid],
      providers: [provideRouter([])],
    })
      .overrideComponent(WishlistGrid, {
        set: { schemas: [NO_ERRORS_SCHEMA] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(WishlistGrid);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('products', mockProducts);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a product card for each product', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('app-product-card');
    expect(cards.length).toBe(2);
  });

  it('should emit addToCart event when triggered by child', () => {
    let emittedProduct: Product | undefined;
    component.addToCart.subscribe((p) => (emittedProduct = p));

    // Get the first product card and trigger its addToCart event manually
    // Since we are not doing a deep test, we can just emit on the component instance directly
    const firstCard = fixture.debugElement.children[0].children[0].componentInstance;
    firstCard.addToCart.emit(mockProducts[0]);

    expect(emittedProduct).toEqual(mockProducts[0]);
  });

  it('should emit quickView event when triggered by child', () => {
    let emittedProduct: Product | undefined;
    component.quickView.subscribe((p) => (emittedProduct = p));

    const firstCard = fixture.debugElement.children[0].children[0].componentInstance;
    firstCard.quickView.emit(mockProducts[0]);

    expect(emittedProduct).toEqual(mockProducts[0]);
  });
});
