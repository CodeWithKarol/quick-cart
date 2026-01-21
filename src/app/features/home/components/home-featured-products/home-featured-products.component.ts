import { Component, input, output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../../products/models/product';
import { ProductCard } from '../../../products/components/product-card/product-card';

@Component({
  selector: 'app-home-featured-products',
  imports: [CommonModule, RouterLink, ProductCard],
  templateUrl: './home-featured-products.component.html',
  styleUrl: './home-featured-products.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeaturedProductsComponent {
  products = input.required<Product[]>();
  addToCart = output<Product>();
  quickView = output<Product>();
}
