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
    {
      id: 6,
      name: 'Mechanical Keyboard',
      price: 149.99,
      description: 'Tactile mechanical switch keyboard for typing enthusiasts.',
      imageUrl: 'https://placehold.co/300x300/png?text=Keyboard',
      category: 'Electronics',
      rating: 4.9,
      reviews: 412,
      images: [
        'https://placehold.co/300x300/png?text=Keyboard+1',
        'https://placehold.co/300x300/png?text=Keyboard+2',
      ],
      colors: [
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
      ],
    },
    {
      id: 7,
      name: 'Yoga Mat',
      price: 29.99,
      description: 'Extra thick non-slip yoga mat for home workouts.',
      imageUrl: 'https://placehold.co/300x300/png?text=Yoga+Mat',
      category: 'Sports',
      rating: 4.3,
      reviews: 156,
      colors: [
        { name: 'Purple', class: 'bg-purple-600', selectedClass: 'ring-purple-600' },
        { name: 'Teal', class: 'bg-teal-600', selectedClass: 'ring-teal-600' },
      ],
    },
    {
      id: 8,
      name: 'Water Bottle',
      price: 24.99,
      description: 'Insulated stainless steel water bottle keeps drinks cold for 24h.',
      imageUrl: 'https://placehold.co/300x300/png?text=Bottle',
      category: 'Accessories',
      rating: 4.5,
      reviews: 89,
    },
    {
      id: 9,
      name: 'Bluetooth Speaker',
      price: 59.99,
      description: 'Portable speaker with powerful bass and long battery life.',
      imageUrl: 'https://placehold.co/300x300/png?text=Speaker',
      category: 'Electronics',
      rating: 4.1,
      reviews: 67,
    },
    {
      id: 10,
      name: 'Desk Lamp',
      price: 35.99,
      description: 'Adjustable LED desk lamp with multiple color temperatures.',
      imageUrl: 'https://placehold.co/300x300/png?text=Lamp',
      category: 'Home',
      rating: 4.0,
      reviews: 42,
    },
    {
      id: 11,
      name: 'Gaming Mouse',
      price: 69.99,
      description: 'High-precision gaming mouse with programmable buttons.',
      imageUrl: 'https://placehold.co/300x300/png?text=Mouse',
      category: 'Electronics',
      rating: 4.7,
      reviews: 231,
    },
    {
      id: 12,
      name: 'Aviator Sunglasses',
      price: 119.99,
      description: 'Classic aviator style sunglasses with polarized lenses.',
      imageUrl: 'https://placehold.co/300x300/png?text=Sunglasses',
      category: 'Accessories',
      rating: 3.8,
      reviews: 34,
      colors: [
        { name: 'Gold', class: 'bg-yellow-500', selectedClass: 'ring-yellow-500' },
        { name: 'Silver', class: 'bg-gray-400', selectedClass: 'ring-gray-400' },
      ],
    },
    {
      id: 13,
      name: 'Cotton T-Shirt',
      price: 19.99,
      description: 'Soft organic cotton t-shirt in various colors.',
      imageUrl: 'https://placehold.co/300x300/png?text=T-Shirt',
      category: 'Clothing',
      rating: 4.4,
      reviews: 512,
      colors: [
        { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
        { name: 'Navy', class: 'bg-blue-900', selectedClass: 'ring-blue-900' },
      ],
    },
    {
      id: 14,
      name: 'Denim Jacket',
      price: 89.99,
      description: 'Vintage wash denim jacket with button closure.',
      imageUrl: 'https://placehold.co/300x300/png?text=Jacket',
      category: 'Clothing',
      rating: 4.8,
      reviews: 98,
    },
    {
      id: 15,
      name: 'Leather Wallet',
      price: 45.99,
      description: 'Slim genuine leather wallet with RFID protection.',
      imageUrl: 'https://placehold.co/300x300/png?text=Wallet',
      category: 'Accessories',
      rating: 4.9,
      reviews: 176,
      colors: [
        { name: 'Brown', class: 'bg-amber-800', selectedClass: 'ring-amber-800' },
        { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      ],
    },
    ...generateRandomProducts(16, 50),
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

function generateRandomProducts(startId: number, count: number): Product[] {
  const categories = [
    'Electronics',
    'Sports',
    'Accessories',
    'Home',
    'Clothing',
    'Beauty',
    'Toys',
    'Automotive',
    'Garden',
    'Pets',
  ];
  const adjectives = [
    'Premium',
    'Deluxe',
    'Compact',
    'Portable',
    'Stylish',
    'Modern',
    'Classic',
    'Vintage',
    'Professional',
    'Ergonomic',
    'Lightweight',
    'Durable',
    'Sleek',
    'Robust',
    'Elegant',
    'Advanced',
    'Organic',
    'Handcrafted',
  ];
  const nouns: Record<string, string[]> = {
    Electronics: [
      'Camera',
      'Tablet',
      'Monitor',
      'Drone',
      'Charger',
      'Microphone',
      'Router',
      'Power Bank',
      'Keyboard',
      'Mouse',
    ],
    Sports: [
      'Dumbbell',
      'Treadmill',
      'Bike',
      'Racket',
      'Ball',
      'Gloves',
      'Jersey',
      'Helmet',
      'Yoga Mat',
      'Sneakers',
    ],
    Accessories: [
      'Watch',
      'Hat',
      'Scarf',
      'Belt',
      'Bag',
      'Umbrella',
      'Glasses',
      'Tie',
      'Wallet',
      'Backpack',
    ],
    Home: [
      'Blender',
      'Toaster',
      'Pillow',
      'Blanket',
      'Vase',
      'Clock',
      'Lamp',
      'Mirror',
      'Rug',
      'Curtains',
    ],
    Clothing: [
      'Hoodie',
      'Jeans',
      'Dress',
      'Shorts',
      'Sweater',
      'Coat',
      'Socks',
      'Shoes',
      'T-Shirt',
      'Jacket',
    ],
    Beauty: [
      'Perfume',
      'Lipstick',
      'Serum',
      'Moisturizer',
      'Brush',
      'Palette',
      'Shampoo',
      'Conditioner',
      'Dryer',
      'Trimmer',
    ],
    Toys: [
      'Action Figure',
      'Doll',
      'Puzzle',
      'Board Game',
      'Teddy Bear',
      'Train Set',
      'Building Blocks',
      'Race Car',
      'Kite',
      'Slime',
    ],
    Automotive: [
      'Car Wax',
      'Tire Inflator',
      'Seat Cover',
      'Floor Mat',
      'Dash Cam',
      'Phone Mount',
      'Vacuum',
      'Air Freshener',
      'Jump Starter',
      'Wrench Set',
    ],
    Garden: [
      'Shovel',
      'Rake',
      'Planter',
      'Hose',
      'Pruner',
      'Gloves',
      'Watering Can',
      'Lawn Mower',
      'Seeds',
      'Fertilizer',
    ],
    Pets: [
      'Dog Bed',
      'Cat Tree',
      'Leash',
      'Collar',
      'Chew Toy',
      'Bird Cage',
      'Fish Tank',
      'Hamster Wheel',
      'Pet Carrier',
      'Food Bowl',
    ],
  };

  const products: Product[] = [];

  for (let i = 0; i < count; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const nounList = nouns[category];
    const noun = nounList[Math.floor(Math.random() * nounList.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];

    products.push({
      id: startId + i,
      name: `${adjective} ${noun}`,
      price: parseFloat((Math.random() * 200 + 10).toFixed(2)),
      description: `A ${adjective.toLowerCase()} ${noun.toLowerCase()} suitable for all your needs. Perfect for daily use.`,
      imageUrl: `https://placehold.co/300x300/png?text=${noun}`,
      category: category,
      rating: parseFloat((Math.random() * 2 + 3).toFixed(1)), // 3.0 to 5.0
      reviews: Math.floor(Math.random() * 500) + 1,
    });
  }

  return products;
}
