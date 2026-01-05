import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  template: `
    <div class="cart-container">
      <h2>Your Shopping Cart</h2>

      @if (cartItems().length === 0) {
      <div class="empty-cart">
        <p>Your cart is empty.</p>
        <a routerLink="/" class="continue-shopping">Start Shopping</a>
      </div>
      } @else {
      <div class="cart-content">
        <div class="cart-items">
          @for (item of cartItems(); track item.product.id) {
          <div class="cart-item">
            <div class="item-image">
              <img
                [ngSrc]="item.product.imageUrl"
                [alt]="item.product.name"
                width="80"
                height="80"
              />
            </div>
            <div class="item-details">
              <h3>{{ item.product.name }}</h3>
              <p class="price">{{ item.product.price | currency }}</p>
            </div>
            <div class="item-actions">
              <div class="quantity-controls">
                <button
                  (click)="updateQuantity(item.product.id, item.quantity - 1)"
                  [disabled]="item.quantity <= 1"
                >
                  -
                </button>
                <span>{{ item.quantity }}</span>
                <button (click)="updateQuantity(item.product.id, item.quantity + 1)">+</button>
              </div>
              <button class="remove-btn" (click)="removeItem(item.product.id)">Remove</button>
            </div>
            <div class="item-total">
              {{ item.product.price * item.quantity | currency }}
            </div>
          </div>
          }
        </div>

        <div class="cart-summary">
          <h3>Order Summary</h3>
          <div class="summary-row">
            <span>Items ({{ cartCount() }}):</span>
            <span>{{ cartTotal() | currency }}</span>
          </div>
          <div class="summary-row total">
            <span>Total:</span>
            <span>{{ cartTotal() | currency }}</span>
          </div>
          <button class="checkout-btn" routerLink="/checkout">Proceed to Checkout</button>
        </div>
      </div>
      }
    </div>
  `,
  styles: [
    `
      .cart-container {
        padding: 20px;
        max-width: 1000px;
        margin: 0 auto;
      }
      .empty-cart {
        text-align: center;
        padding: 40px;
      }
      .continue-shopping {
        display: inline-block;
        margin-top: 16px;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 4px;
      }
      .cart-content {
        display: grid;
        grid-template-columns: 1fr 300px;
        gap: 24px;
      }
      @media (max-width: 768px) {
        .cart-content {
          grid-template-columns: 1fr;
        }
      }
      .cart-item {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px;
        border-bottom: 1px solid #eee;
      }
      .item-image {
        width: 80px;
        height: 80px;
        flex-shrink: 0;
      }
      .item-image img {
        object-fit: cover;
        border-radius: 4px;
      }
      .item-details {
        flex: 1;
      }
      .item-details h3 {
        margin: 0 0 4px 0;
        font-size: 1rem;
      }
      .quantity-controls {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
      }
      .quantity-controls button {
        width: 24px;
        height: 24px;
        border: 1px solid #ccc;
        background: white;
        border-radius: 4px;
        cursor: pointer;
      }
      .remove-btn {
        color: #dc3545;
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        font-size: 0.9rem;
        text-decoration: underline;
      }
      .item-total {
        font-weight: bold;
        font-size: 1.1rem;
        min-width: 80px;
        text-align: right;
      }
      .cart-summary {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 8px;
        height: fit-content;
      }
      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 12px;
      }
      .summary-row.total {
        font-weight: bold;
        font-size: 1.2rem;
        border-top: 1px solid #ddd;
        padding-top: 12px;
        margin-top: 12px;
      }
      .checkout-btn {
        width: 100%;
        padding: 12px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 16px;
      }
      .checkout-btn:hover {
        background-color: #218838;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartComponent {
  private cartService = inject(CartService);

  cartItems = this.cartService.cartItems;
  cartCount = this.cartService.cartCount;
  cartTotal = this.cartService.cartTotal;

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}
