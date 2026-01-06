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
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      description: 'Track your fitness and notifications on the go.',
      imageUrl: 'https://placehold.co/300x300/png?text=Watch',
      category: 'Electronics',
    },
    {
      id: 3,
      name: 'Running Shoes',
      price: 79.99,
      description: 'Comfortable running shoes for all terrains.',
      imageUrl: 'https://placehold.co/300x300/png?text=Shoes',
      category: 'Sports',
    },
    {
      id: 4,
      name: 'Backpack',
      price: 49.99,
      description: 'Durable backpack for travel and school.',
      imageUrl: 'https://placehold.co/300x300/png?text=Backpack',
      category: 'Accessories',
    },
    {
      id: 5,
      name: 'Coffee Maker',
      price: 129.99,
      description: 'Brew the perfect cup of coffee every morning.',
      imageUrl: 'https://placehold.co/300x300/png?text=Coffee',
      category: 'Home',
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
}
