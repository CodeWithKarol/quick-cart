import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/products/pages/product-list-page/product-list-page').then(
        (m) => m.ProductListPage
      ),
    title: 'QuickCart - Home',
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/products/pages/product-overview-page/product-overview-page').then(
        (m) => m.ProductOverviewPage
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
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/pages/checkout-page/checkout-page').then((m) => m.CheckoutPage),
    title: 'QuickCart - Checkout',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
