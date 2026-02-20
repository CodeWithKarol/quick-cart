import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartDrawerItemComponent } from './cart-drawer-item.component';
import { provideRouter } from '@angular/router';
import { IMAGE_CONFIG } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('CartDrawerItemComponent', () => {
  let component: CartDrawerItemComponent;
  let fixture: ComponentFixture<CartDrawerItemComponent>;

  const mockCartItem = {
    product: {
      id: 1,
      name: 'Test Product',
      price: 29.99,
      description: 'Test description',
      imageUrl: 'test.jpg',
      category: 'Test',
      rating: 4.5,
      reviews: 10,
    },
    quantity: 2,
    selectedColor: 'Blue',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartDrawerItemComponent],
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

    fixture = TestBed.createComponent(CartDrawerItemComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('item', mockCartItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display item details', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h3')?.textContent).toContain('Test Product');
    expect(compiled.textContent).toContain('$29.99');
    expect(compiled.textContent).toContain('2');
  });

  it('should emit remove event', () => {
    let emitted = false;
    component.remove.subscribe(() => {
      emitted = true;
    });

    component.onRemove();

    expect(emitted).toBe(true);
  });
});
