import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Product } from '../../core/models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div class="product-card">
      <div class="image-container">
        <img [ngSrc]="product().imageUrl" [alt]="product().name" fill priority />
      </div>
      <div class="details">
        <h3>{{ product().name }}</h3>
        <p class="category">{{ product().category }}</p>
        <p class="price">{{ product().price | currency }}</p>
        <button (click)="onAddToCart()">Add to Cart</button>
      </div>
    </div>
  `,
  styles: [
    `
      .product-card {
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        transition: box-shadow 0.2s;
        background: white;
      }
      .product-card:hover {
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
      .image-container {
        position: relative;
        width: 100%;
        height: 200px; /* Fixed height for consistency */
        overflow: hidden;
        border-radius: 4px;
      }
      img {
        object-fit: cover;
        width: 100%;
        height: 100%;
      }
      .details {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
      h3 {
        margin: 0;
        font-size: 1.1rem;
      }
      .category {
        color: #666;
        font-size: 0.9rem;
        margin: 0;
      }
      .price {
        font-weight: bold;
        font-size: 1.2rem;
        color: #2c3e50;
        margin: 0;
      }
      button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 500;
        transition: background-color 0.2s;
      }
      button:hover {
        background-color: #0056b3;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  product = input.required<Product>();
  addToCart = output<Product>();

  onAddToCart() {
    this.addToCart.emit(this.product());
  }
}
