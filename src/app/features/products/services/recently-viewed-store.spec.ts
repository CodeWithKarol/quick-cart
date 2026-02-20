import { TestBed } from '@angular/core/testing';
import { RecentlyViewedService } from './recently-viewed-store';

describe('RecentlyViewedService', () => {
  let service: RecentlyViewedService;
  const STORAGE_KEY = 'quick-cart-recently-viewed';

  beforeEach(() => {
    // Clear storage before each test
    localStorage.clear();

    TestBed.configureTestingModule({});
    service = TestBed.inject(RecentlyViewedService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.recentlyViewedIds()).toEqual([]);
  });

  it('should add a product id and save to localStorage', () => {
    service.addProduct(1);
    TestBed.flushEffects(); // flush signals/effects manually if needed

    expect(service.recentlyViewedIds()).toEqual([1]);
    expect(localStorage.getItem(STORAGE_KEY)).toBe('[1]');
  });

  it('should keep track of order (most recent first)', () => {
    service.addProduct(1);
    service.addProduct(2);
    expect(service.recentlyViewedIds()).toEqual([2, 1]);
  });

  it('should move an existing product to the front', () => {
    service.addProduct(1);
    service.addProduct(2);
    service.addProduct(1); // View 1 again
    expect(service.recentlyViewedIds()).toEqual([1, 2]);
  });

  it('should limit to 4 items', () => {
    service.addProduct(1);
    service.addProduct(2);
    service.addProduct(3);
    service.addProduct(4);
    service.addProduct(5);

    expect(service.recentlyViewedIds().length).toBe(4);
    expect(service.recentlyViewedIds()).toEqual([5, 4, 3, 2]);
  });

  it('should load from localStorage on init', () => {
    localStorage.setItem(STORAGE_KEY, '[99, 100]');

    let manualService: RecentlyViewedService;
    TestBed.runInInjectionContext(() => {
      manualService = new RecentlyViewedService();
    });

    expect(manualService!.recentlyViewedIds()).toEqual([99, 100]);
  });

  it('should handle invalid JSON gracefully', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid-json');

    let manualService: RecentlyViewedService;
    TestBed.runInInjectionContext(() => {
      manualService = new RecentlyViewedService();
    });

    expect(manualService!.recentlyViewedIds()).toEqual([]);
  });
});
