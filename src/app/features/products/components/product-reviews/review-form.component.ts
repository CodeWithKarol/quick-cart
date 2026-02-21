import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div
      class="mt-8 border border-primary-100 bg-secondary-50/30 p-6 sm:p-8 animate-in fade-in slide-in-from-top-4 duration-500"
    >
      <h4 class="text-sm font-bold text-primary-900 uppercase tracking-widest mb-6">
        Write your review
      </h4>

      <form (submit)="onSubmit($event)" class="space-y-6">
        <!-- Star Rating -->
        <div>
          <span class="text-xs font-medium text-primary-500 uppercase tracking-wider block mb-2"
            >Rating</span
          >
          <div class="flex items-center gap-1">
            @for (star of [1, 2, 3, 4, 5]; track star) {
              <button
                type="button"
                (click)="rating.set(star)"
                (mouseenter)="hoverRating.set(star)"
                (mouseleave)="hoverRating.set(0)"
                class="focus:outline-none transition-transform hover:scale-110"
              >
                <svg
                  class="h-6 w-6"
                  [class.text-primary-900]="(hoverRating() || rating()) >= star"
                  [class.text-primary-200]="(hoverRating() || rating()) < star"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            }
          </div>
        </div>

        <!-- Review Content -->
        <div>
          <label
            for="review-content"
            class="text-xs font-medium text-primary-500 uppercase tracking-wider block mb-2"
            >Your Thoughts</label
          >
          <textarea
            id="review-content"
            rows="4"
            [(ngModel)]="content"
            name="content"
            placeholder="What was your experience with this piece?"
            class="w-full bg-white border border-primary-100 px-4 py-3 text-sm text-primary-900 placeholder:text-primary-300 focus:ring-0 focus:border-primary-900 transition-colors resize-none font-light italic"
          ></textarea>
        </div>

        <div class="flex justify-end gap-3">
          <button
            type="button"
            (click)="reviewCancel.emit()"
            class="px-6 py-2 text-xs font-bold uppercase tracking-widest text-primary-400 hover:text-primary-900 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            [disabled]="!rating() || !content()"
            class="bg-primary-900 text-white px-8 py-2 text-xs font-bold uppercase tracking-widest hover:bg-primary-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Review
          </button>
        </div>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewForm {
  rating = signal(0);
  hoverRating = signal(0);
  content = signal('');

  reviewSubmit = output<{ rating: number; content: string }>();
  reviewCancel = output<void>();

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.rating() && this.content()) {
      this.reviewSubmit.emit({ rating: this.rating(), content: this.content() });
    }
  }
}
