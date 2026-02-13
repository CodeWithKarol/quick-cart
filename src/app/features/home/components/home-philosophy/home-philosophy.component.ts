import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-philosophy',
  standalone: true,
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './home-philosophy.component.html',
  styleUrl: './home-philosophy.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePhilosophyComponent {}
