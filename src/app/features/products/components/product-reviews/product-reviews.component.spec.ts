import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductReviews, Review, ReviewBreakdownItem } from './product-reviews.component';
import { Product } from '../../models/product';

describe('ProductReviews', () => {
  let component: ProductReviews;
  let fixture: ComponentFixture<ProductReviews>;

  const mockProduct: Product = {
    id: 1,
    name: 'Product',
    price: 10,
    description: 'Desc',
    imageUrl: 'img.jpg',
    category: 'Hat',
    rating: 4,
    reviews: 120,
  };

  const mockBreakdown: ReviewBreakdownItem[] = [
    { label: '5 stars', value: 80 },
    { label: '4 stars', value: 10 },
    { label: '3 stars', value: 5 },
    { label: '2 stars', value: 3 },
    { label: '1 star', value: 2 },
  ];

  const mockPhotos: string[] = ['photo1.jpg', 'photo2.jpg'];

  const mockReviews: Review[] = [
    { id: 1, author: 'Alice', rating: 5, avatar: 'alice.jpg', content: 'Great!' },
    { id: 2, author: 'Bob', rating: 4, avatar: 'bob.jpg', content: 'Good.' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductReviews],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductReviews);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('product', mockProduct);
    fixture.componentRef.setInput('reviewBreakdown', mockBreakdown);
    fixture.componentRef.setInput('customerPhotos', mockPhotos);
    fixture.componentRef.setInput('reviews', mockReviews);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render overall rating and review count', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Based on 120 reviews');
  });

  it('should render review breakdown bars', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('dt');
    expect(items.length).toBe(5);
    expect(items[0].textContent).toBe('5 stars');
  });

  it('should render customer photos', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const photos = compiled.querySelectorAll('img[alt="Customer photo"]');
    expect(photos.length).toBe(2);
    expect(photos[0].getAttribute('src')).toBe('photo1.jpg');
  });

  it('should render recent reviews', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const authors = compiled.querySelectorAll('h4');
    expect(authors[0].textContent).toBe('Alice');
    expect(authors[1].textContent).toBe('Bob');

    expect(compiled.textContent).toContain('Great!');
    expect(compiled.textContent).toContain('Good.');
  });
});
