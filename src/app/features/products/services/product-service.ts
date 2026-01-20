import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 99.99,
      description: 'High-quality wireless headphones with noise cancellation.',
      imageUrl: 'https://placehold.co/300x300/png?text=Headphones',
      category: 'Electronics',
      rating: 4.5,
      reviews: 128,
      images: [
        'https://placehold.co/300x300/png?text=Headphones+1',
        'https://placehold.co/300x300/png?text=Headphones+2',
        'https://placehold.co/300x300/png?text=Headphones+3',
        'https://placehold.co/300x300/png?text=Headphones+4',
      ],
      colors: [
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Blue', class: 'bg-blue-600', selectedClass: 'ring-blue-600' },
      ],
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      description: 'Track your fitness and notifications on the go.',
      imageUrl: 'https://placehold.co/300x300/png?text=Watch',
      category: 'Electronics',
      rating: 4.2,
      reviews: 85,
      images: [
        'https://placehold.co/300x300/png?text=Watch+1',
        'https://placehold.co/300x300/png?text=Watch+2',
      ],
      colors: [
        { name: 'Space Gray', class: 'bg-gray-700', selectedClass: 'ring-gray-700' },
        { name: 'Silver', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
        { name: 'Rose Gold', class: 'bg-pink-200', selectedClass: 'ring-pink-200' },
      ],
    },
    {
      id: 3,
      name: 'Running Shoes',
      price: 79.99,
      description: 'Comfortable running shoes for all terrains.',
      imageUrl: 'https://placehold.co/300x300/png?text=Shoes',
      category: 'Sports',
      rating: 4.8,
      reviews: 210,
    },
    {
      id: 4,
      name: 'Backpack',
      price: 49.99,
      description: 'Durable backpack for travel and school.',
      imageUrl: 'https://placehold.co/300x300/png?text=Backpack',
      category: 'Accessories',
      rating: 4.6,
      reviews: 45,
    },
    {
      id: 5,
      name: 'Coffee Maker',
      price: 129.99,
      description: 'Brew the perfect cup of coffee every morning.',
      imageUrl: 'https://placehold.co/300x300/png?text=Coffee',
      category: 'Home',
      rating: 4.7,
      reviews: 320,
    },
  ];

  getProducts(): Observable<Product[]> {
    // Simulate API latency
    return of(this.products).pipe(delay(500));
  }

  getProductById(id: number): Observable<Product | undefined> {
    const product = this.products.find((p) => p.id === id);
    return of(product).pipe(delay(300));
  }

  getRelatedProducts(currentProductId: number, limit: number = 4): Observable<Product[]> {
    const currentProduct = this.products.find((p) => p.id === currentProductId);
    if (!currentProduct) return of([]);

    const related = this.products
      .filter((p) => p.category === currentProduct.category && p.id !== currentProductId)
      .slice(0, limit);

    // If not enough related products in category, fill with others
    if (related.length < limit) {
      const remaining = limit - related.length;
      const others = this.products
        .filter((p) => p.category !== currentProduct.category && p.id !== currentProductId)
        .slice(0, remaining);
      return of([...related, ...others]).pipe(delay(300));
    }

    return of(related).pipe(delay(300));
  }
}
