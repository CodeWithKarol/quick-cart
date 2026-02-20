import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home-categories.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeCategoriesComponent {
  categories = [
    {
      name: 'Lighting',
      description: 'Sculptural pieces that illuminate your space with intent.',
      image:
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?q=80&w=2070&auto=format&fit=crop',
      link: '/shop?category=lighting',
    },
    {
      name: 'Furniture',
      description: 'Heirloom-quality furniture crafted for generations.',
      image:
        'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=1964&auto=format&fit=crop',
      link: '/shop?category=furniture',
    },
    {
      name: 'Decor',
      description: 'Objects of beauty that bring your home to life.',
      image:
        'https://images.unsplash.com/photo-1581783898377-1c85bf937427?q=80&w=1915&auto=format&fit=crop',
      link: '/shop?category=decor',
    },
  ];
}
