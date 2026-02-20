import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-faq.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFaqComponent {
  faqs = signal([
    {
      question: 'What is your commitment to sustainability?',
      answer:
        'We ensure all our products are made with 100% organic or recycled materials. Our packaging is entirely plastic-free and recyclable.',
      open: false,
    },
    {
      question: 'Do you offer international shipping?',
      answer:
        'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location but we always offset our carbon footprint.',
      open: false,
    },
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day no-questions-asked return policy. Pieces must be in their original condition and packaging.',
      open: false,
    },
    {
      question: 'How do I care for my products?',
      answer:
        'Each item comes with a digital care guide. Generally, we recommend gentle cleaning and avoiding direct sunlight for natural materials.',
      open: false,
    },
  ]);

  toggle(index: number) {
    this.faqs.update((items) =>
      items.map((item, i) =>
        i === index ? { ...item, open: !item.open } : { ...item, open: false },
      ),
    );
  }
}
