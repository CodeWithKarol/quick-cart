import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/products/product-list.component').then((m) => m.ProductListComponent),
    title: 'QuickCart - Home',
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart.component').then((m) => m.CartComponent),
    title: 'QuickCart - Cart',
  },
  {
    path: 'checkout',
    loadComponent: () =>
      import('./features/checkout/checkout.component').then((m) => m.CheckoutComponent),
    title: 'QuickCart - Checkout',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
