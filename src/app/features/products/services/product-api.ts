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
      imageUrl:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Electronics',
      rating: 4.5,
      reviews: 128,
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      imageUrl:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Electronics',
      rating: 4.2,
      reviews: 85,
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
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
      imageUrl:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Sports',
      rating: 4.8,
      reviews: 210,
    },
    {
      id: 4,
      name: 'Professional Camera Lens',
      price: 499.99,
      description: 'High-quality camera lens for professional photography.',
      imageUrl:
        'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Electronics',
      rating: 4.9,
      reviews: 64,
    },
    {
      id: 5,
      name: 'City Runner Sneakers',
      price: 129.99,
      description: 'Stylish black sneakers perfect for urban life.',
      imageUrl:
        'https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Clothing',
      rating: 4.6,
      reviews: 142,
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

  getProductsByIds(ids: number[]): Observable<Product[]> {
    const products = this.products.filter((p) => ids.includes(p.id));
    return of(products).pipe(delay(300));
  }

  getRelatedProducts(currentProductId: number, limit = 4): Observable<Product[]> {
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
