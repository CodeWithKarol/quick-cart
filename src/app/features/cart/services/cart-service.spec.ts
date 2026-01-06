import { TestBed } from '@angular/core/testing';
import { CartService } from './cart-service';
import { Product } from '../../products/models/product';

describe('CartService', () => {
  let service: CartService;

  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 10.0,
    description: 'Test Description',
    imageUrl: 'test.jpg',
    category: 'Test',
    rating: 4.5,
    reviews: 10,
  };

  const mockProduct2: Product = {
    id: 2,
    name: 'Second Product',
    price: 20.0,
    description: 'Second Description',
    imageUrl: 'test2.jpg',
    category: 'Test',
    rating: 4.0,
    reviews: 5,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add item to cart', () => {
    service.addToCart(mockProduct);
    const items = service.cartItems();
    expect(items.length).toBe(1);
    expect(items[0].product).toEqual(mockProduct);
    expect(items[0].quantity).toBe(1);
    expect(service.cartCount()).toBe(1);
    expect(service.cartTotal()).toBe(10.0);
  });

  it('should increment quantity if item already in cart', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct);
    const items = service.cartItems();
    expect(items.length).toBe(1);
    expect(items[0].quantity).toBe(2);
    expect(service.cartCount()).toBe(2);
    expect(service.cartTotal()).toBe(20.0);
  });

  it('should add different items to cart', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct2);
    const items = service.cartItems();
    expect(items.length).toBe(2);
    expect(service.cartCount()).toBe(2);
    expect(service.cartTotal()).toBe(30.0);
  });

  it('should remove item from cart', () => {
    service.addToCart(mockProduct);
    service.removeFromCart(mockProduct.id);
    expect(service.cartItems().length).toBe(0);
    expect(service.cartCount()).toBe(0);
  });

  it('should update quantity', () => {
    service.addToCart(mockProduct);
    service.updateQuantity(mockProduct.id, 5);
    expect(service.cartItems()[0].quantity).toBe(5);
    expect(service.cartCount()).toBe(5);
    expect(service.cartTotal()).toBe(50.0);
  });

  it('should remove item if quantity updated to 0', () => {
    service.addToCart(mockProduct);
    service.updateQuantity(mockProduct.id, 0);
    expect(service.cartItems().length).toBe(0);
  });

  it('should clear cart', () => {
    service.addToCart(mockProduct);
    service.addToCart(mockProduct2);
    service.clearCart();
    expect(service.cartItems().length).toBe(0);
    expect(service.cartCount()).toBe(0);
    expect(service.cartTotal()).toBe(0);
  });
});
