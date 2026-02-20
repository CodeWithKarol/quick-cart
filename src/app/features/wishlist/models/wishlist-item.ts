import { Product } from '../../products/models/product';

export interface WishlistProduct extends Product {
  wishlistVariant?: string;
  wishlistCollection: string;
}
