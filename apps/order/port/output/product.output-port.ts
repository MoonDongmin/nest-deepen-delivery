import { ProductEntity } from '../../domain/product.entity';

export interface ProductOutputPort {
  getProductsById(productIds: string[]): Promise<ProductEntity[]>;
}
