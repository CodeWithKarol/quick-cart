import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-newsletter',
  imports: [CommonModule],
  templateUrl: './home-newsletter.component.html',
  styleUrl: './home-newsletter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeNewsletterComponent {}
