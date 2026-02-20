import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductGallery } from './product-gallery.component';
import { Product } from '../../models/product';
import { IMAGE_CONFIG } from '@angular/common';

describe('ProductGallery', () => {
  let component: ProductGallery;
  let fixture: ComponentFixture<ProductGallery>;

  const mockProduct: Product = {
    id: 1,
    name: 'Gallery Product',
    price: 100,
    description: 'Desc',
    imageUrl: 'main.jpg',
    category: 'Home',
    rating: 5,
    reviews: 10,
    images: ['img1.jpg', 'img2.jpg'],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductGallery],
      providers: [
        {
          provide: IMAGE_CONFIG, // To bypass NgOptimizedImage errors in jsdom
          useValue: { disableImageSizeWarning: true, disableImageLazyLoadWarning: true },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductGallery);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('product', mockProduct);
    fixture.componentRef.setInput('selectedImage', mockProduct.images![0]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate galleryImages computed signal correctly', () => {
    expect(component.galleryImages()).toEqual(['img1.jpg', 'img2.jpg']);
  });

  it('should fallback to imageUrl if images array is absent', () => {
    const fallbackProduct = { ...mockProduct, images: undefined };
    fixture.componentRef.setInput('product', fallbackProduct);
    fixture.detectChanges();
    expect(component.galleryImages()).toEqual(['main.jpg']);
  });

  it('should render all thumbnail images', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const thumbnails = compiled.querySelectorAll('button[role="tab"] img');
    // Note: It's 'img' because the NgOptimizedImage directive modifies them
    expect(thumbnails.length).toBe(2);
    // Standard img tags check:
    expect(thumbnails[0].getAttribute('src')).toBe('img1.jpg');
    expect(thumbnails[1].getAttribute('src')).toBe('img2.jpg');
  });

  it('should emit selectedImageChange when a thumbnail is clicked', () => {
    let emittedImage: string | undefined;
    component.selectedImageChange.subscribe((img) => (emittedImage = img));

    const compiled = fixture.nativeElement as HTMLElement;
    const thumbnails = compiled.querySelectorAll('button[role="tab"]');
    (thumbnails[1] as HTMLElement).click();

    expect(emittedImage).toBe('img2.jpg');
  });
});
