import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartItemComponent } from './cart-item-card';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IMAGE_CONFIG } from '@angular/common';

describe('CartItemComponent', () => {
  let component: CartItemComponent;
  let fixture: ComponentFixture<CartItemComponent>;

  const mockCartItem = {
    product: {
      id: 1,
      name: 'Test Product',
      price: 29.99,
      description: 'Desc',
      imageUrl: 'test.jpg',
      category: 'Test',
      rating: 4.5,
      reviews: 10,
    },
    quantity: 2,
    selectedColor: 'Red',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartItemComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: IMAGE_CONFIG,
          useValue: {
            disableImageSizeWarning: true,
            disableImageLazyLoadWarning: true,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CartItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', mockCartItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display product info', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Test Product');
    expect(compiled.textContent).toContain('$29.99');
  });

  it('should take inputs without throwing', () => {
    expect(component.item().product.name).toBe('Test Product');
  });

  it('should emit events', () => {
    let updateFired = false;
    let removeFired = false;

    component.quantityUpdate.subscribe((val) => {
      expect(val).toBe(3);
      updateFired = true;
    });

    component.remove.subscribe(() => {
      removeFired = true;
    });

    component.onQuantityUpdate(3);
    component.onRemove();

    expect(updateFired).toBe(true);
    expect(removeFired).toBe(true);
  });
});
