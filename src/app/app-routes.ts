import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page').then((m) => m.HomePage),
    title: 'QuickCart - Home',
  },
  {
    path: 'shop',
    loadComponent: () =>
      import('./features/products/pages/product-list-page/product-list-page').then(
        (m) => m.ProductListPage,
      ),
    title: 'QuickCart - Shop',
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/products/pages/product-overview-page/product-overview-page').then(
        (m) => m.ProductOverviewPage,
      ),
    title: 'QuickCart - Product Details',
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./features/cart/pages/cart-page/cart-page').then((m) => m.CartPage),
    title: 'QuickCart - Cart',
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/pages/wishlist-page/wishlist-page').then((m) => m.WishlistPage),
    title: 'QuickCart - Wishlist',
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/pages/checkout-page/checkout-page').then((m) => m.CheckoutPage),
    title: 'QuickCart - Checkout',
  },
  {
    path: 'order-success',
    loadComponent: () =>
      import('./features/checkout/pages/order-success-page/order-success-page').then(
        (m) => m.OrderSuccessPage,
      ),
    title: 'QuickCart - Order Confirmed',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
