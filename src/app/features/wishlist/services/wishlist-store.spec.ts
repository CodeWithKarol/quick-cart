import { TestBed } from '@angular/core/testing';
import { WishlistService } from './wishlist-store';
import { ToastService } from '../../../shared/services/toast-service';
import { ProductService } from '../../products/services/product-api';
import { of } from 'rxjs';
import { Product } from '../../products/models/product';

describe('WishlistService', () => {
  let service: WishlistService;
  let toastServiceSpy: {
    show: ReturnType<typeof vi.fn>;
    success: ReturnType<typeof vi.fn>;
    info: ReturnType<typeof vi.fn>;
    error: ReturnType<typeof vi.fn>;
  };
  let productServiceSpy: { getProducts: ReturnType<typeof vi.fn> };

  const mockProducts: Product[] = [
    {
      id: 1,
      name: 'Prod1',
      price: 10,
      category: 'A',
      imageUrl: 'img1',
      description: 'desc1',
      rating: 5,
      reviews: 10,
    },
    {
      id: 2,
      name: 'Prod2',
      price: 20,
      category: 'B',
      imageUrl: 'img2',
      description: 'desc2',
      rating: 4,
      reviews: 5,
    },
  ];

  beforeEach(() => {
    toastServiceSpy = {
      show: vi.fn(),
      success: vi.fn(),
      info: vi.fn(),
      error: vi.fn(),
    };

    productServiceSpy = {
      getProducts: vi.fn().mockReturnValue(of(mockProducts)),
    };

    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        { provide: ToastService, useValue: toastServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
      ],
    });
  });

  afterEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  function createService() {
    let svc: WishlistService;
    TestBed.runInInjectionContext(() => {
      svc = new WishlistService();
    });
    return svc!;
  }

  it('should be created and load initial empty state', () => {
    service = createService();
    expect(service).toBeTruthy();
    expect(service.wishlist()).toEqual([]);
  });

  it('should load wishlist from localStorage on init and remove invalid product IDs', () => {
    // Both 1 and 99 are in localStorage. 99 is not in mockProducts.
    localStorage.setItem(
      'wishlist_v2',
      JSON.stringify([
        { productId: 1, collection: 'All' },
        { productId: 99, collection: 'All' },
      ]),
    );

    service = createService();

    // The constructor calls getProducts(), which filters out 99.
    expect(service.wishlist()).toEqual([{ productId: 1, collection: 'All' }]);
  });

  it('should handle invalid JSON in localStorage gracefully', () => {
    localStorage.setItem('wishlist', 'invalid-json');
    service = createService();
    // Falls back to empty array and then getProducts observable resolves
    expect(service.wishlist()).toEqual([]);
  });

  it('should toggle adding a product and save to localStorage via effect', () => {
    service = createService();

    service.toggle(1);
    TestBed.flushEffects(); // trigger effect

    expect(service.wishlist()).toEqual([{ productId: 1, variant: undefined, collection: 'All' }]);
    expect(toastServiceSpy.success).toHaveBeenCalledWith('Added to wishlist');
    expect(localStorage.getItem('wishlist_v2')).toContain('"productId":1');
  });

  it('should toggle removing a product and save to localStorage via effect', () => {
    localStorage.setItem('wishlist_v2', JSON.stringify([{ productId: 1, collection: 'All' }]));
    service = createService(); // Will load [1]

    service.toggle(1); // Should remove it
    TestBed.flushEffects();

    expect(service.wishlist()).toEqual([]);
    expect(toastServiceSpy.info).toHaveBeenCalledWith('Removed from wishlist');
    expect(localStorage.getItem('wishlist_v2')).toBe('[]');
  });

  it('should return boolean for isInWishlist', () => {
    service = createService();

    expect(service.isInWishlist(1)).toBe(false);
    service.toggle(1);
    expect(service.isInWishlist(1)).toBe(true);
  });
});
