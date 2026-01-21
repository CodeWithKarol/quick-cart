import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RecentlyViewedService {
  private readonly STORAGE_KEY = 'quick-cart-recently-viewed';
  readonly recentlyViewedIds = signal<number[]>(this.loadFromStorage());

  constructor() {
    effect(() => {
      this.saveToStorage(this.recentlyViewedIds());
    });
  }

  addProduct(productId: number) {
    this.recentlyViewedIds.update((ids) => {
      // Remove if exists to move to top
      const newIds = ids.filter((id) => id !== productId);
      // Add to front
      newIds.unshift(productId);
      // Limit to 4 items
      return newIds.slice(0, 4);
    });
  }

  private loadFromStorage(): number[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  private saveToStorage(ids: number[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(ids));
  }
}
