import { ProductOutputPort }                    from '../../port/output/product.output-port';
import { Inject, OnModuleInit }                 from '@nestjs/common';
import { PRODUCT_SERVICE, ProductMicroservice } from '@app/common';
import { ClientGrpc }                           from '@nestjs/microservices';
import { ProductEntity }                        from '../../domain/product.entity';
import { Promise }                              from 'mongoose';
import { lastValueFrom }                        from 'rxjs';
import { GetProductsIdsResponseMapper }         from './mapper/get-products-info-response.mapper';

export class ProductGrpc implements ProductOutputPort, OnModuleInit {
  productClient: ProductMicroservice.ProductServiceClient;

  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productMicroservice: ClientGrpc,
  ) {}

  onModuleInit(): any {
    this.productClient =
      this.productMicroservice.getService<ProductMicroservice.ProductServiceClient>(
        'ProductService',
      );
  }

  async getProductsById(productIds: string[]): Promise<ProductEntity[]> {
    const resp = await lastValueFrom(
      this.productClient.getProductsInfo({
        productIds,
      }),
    );
    return new GetProductsIdsResponseMapper(resp).toDomain();
  }
}
