import { ComponentFixture, TestBed } from '@angular/core/testing';
import { QuickViewComponent } from './quick-view-dialog';
import { Product } from '../../models/product';
import { CartService } from '../../../cart/services/cart-store';
import { provideRouter } from '@angular/router';
import { IMAGE_CONFIG } from '@angular/common';

describe('QuickViewComponent', () => {
  let component: QuickViewComponent;
  let fixture: ComponentFixture<QuickViewComponent>;
  let cartServiceSpy: { addToCart: ReturnType<typeof vi.fn> };

  const mockProduct: Product = {
    id: 1,
    name: 'Quick Product',
    price: 99,
    description: 'Quick Desc',
    imageUrl: 'quick.jpg',
    category: 'Home',
    rating: 3,
    reviews: 10,
  };

  beforeEach(async () => {
    cartServiceSpy = {
      addToCart: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [QuickViewComponent],
      providers: [
        provideRouter([]),
        { provide: CartService, useValue: cartServiceSpy },
        {
          provide: IMAGE_CONFIG,
          useValue: { disableImageSizeWarning: true, disableImageLazyLoadWarning: true },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuickViewComponent);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('product', mockProduct);
    fixture.componentRef.setInput('isOpen', true);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render dialog content when isOpen is true', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Quick Product');
    expect(compiled.textContent).toContain('99');
    expect(compiled.textContent).toContain('Quick Desc');
  });

  it('should not render dialog content when isOpen is false', () => {
    fixture.componentRef.setInput('isOpen', false);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')).toBeNull();
  });

  it('should emit closeModal when close button is clicked', () => {
    let closeModalEmitted = false;
    component.closeModal.subscribe(() => (closeModalEmitted = true));

    const compiled = fixture.nativeElement as HTMLElement;
    const closeBtn = compiled.querySelector('button[type="button"]') as HTMLElement;

    closeBtn.click();
    expect(closeModalEmitted).toBe(true);
  });

  it('should call addToCart on cartService and emit closeModal when add to bag is clicked', () => {
    let closeModalEmitted = false;
    component.closeModal.subscribe(() => (closeModalEmitted = true));

    const compiled = fixture.nativeElement as HTMLElement;
    const buttons = Array.from(compiled.querySelectorAll('button'));
    const addToBagBtn = buttons.find((b) => b.textContent?.trim().toLowerCase() === 'add to bag');

    addToBagBtn?.click();

    expect(cartServiceSpy.addToCart).toHaveBeenCalledWith(mockProduct);
    expect(closeModalEmitted).toBe(true);
  });
});
