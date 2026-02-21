import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-testimonials.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeTestimonialsComponent {
  featuredTestimonial = {
    quote:
      'The quality of the craftsmanship is evident in every detail. My home feels more intentional and peaceful. A true masterclass in curated design.',
    author: 'Sarah Jenkins',
    location: 'San Francisco, CA',
  };

  secondaryTestimonials = [
    {
      quote:
        'Finally, a brand that cares as much about sustainability as they do about design. Truly impressive.',
      author: 'Michael R.',
      location: 'New York',
    },
    {
      quote:
        "Every piece I've purchased has become a conversation starter. Modern minimalism at its best.",
      author: 'Elena K.',
      location: 'Austin',
    },
  ];
}
