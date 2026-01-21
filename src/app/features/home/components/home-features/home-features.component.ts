import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-features',
  imports: [CommonModule],
  templateUrl: './home-features.component.html',
  styleUrl: './home-features.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeFeaturesComponent {}
