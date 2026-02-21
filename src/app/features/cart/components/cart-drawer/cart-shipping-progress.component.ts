import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart-store';

@Component({
  selector: 'app-cart-shipping-progress',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="px-4 py-4 mb-4 bg-primary-50/50 rounded-lg border border-primary-100">
      <div class="flex justify-between items-center mb-2">
        <p class="text-sm font-medium text-primary-900">
          @if (remaining() > 0) {
            Spend
            <span class="text-primary-600 font-display">{{ remaining() | currency }}</span> more for
            FREE shipping!
          } @else {
            🎉 You've unlocked <span class="text-primary-600 font-display">FREE shipping!</span>
          }
        </p>
        <span class="text-xs font-light text-primary-500">{{ progress() | number: '1.0-0' }}%</span>
      </div>
      <div class="h-1.5 w-full bg-primary-100 rounded-full overflow-hidden">
        <div
          class="h-full bg-primary-600 transition-all duration-700 ease-out rounded-full"
          [style.width.%]="progress()"
        ></div>
      </div>
    </div>
  `,
})
export class CartShippingProgressComponent {
  private cartService = inject(CartService);

  progress = this.cartService.freeShippingProgress;
  remaining = this.cartService.remainingForFreeShipping;
}
