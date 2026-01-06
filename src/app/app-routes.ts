import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/products/product-list-page').then((m) => m.ProductListPage),
    title: 'QuickCart - Home',
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/products/product-overview-page').then((m) => m.ProductOverviewPage),
    title: 'QuickCart - Product Details',
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart-page').then((m) => m.CartPage),
    title: 'QuickCart - Cart',
  },
  {
    path: 'checkout',
    loadComponent: () => import('./features/checkout/checkout-page').then((m) => m.CheckoutPage),
    title: 'QuickCart - Checkout',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
