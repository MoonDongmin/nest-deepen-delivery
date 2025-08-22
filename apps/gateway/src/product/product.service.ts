import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { PRODUCT_SERVICE, ProductMicroservice } from '@app/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ProductService implements OnModuleInit {
  productService: ProductMicroservice.ProductServiceClient;

  constructor(
    @Inject(PRODUCT_SERVICE)
    private readonly productMicroService: ClientGrpc,
  ) {}

  onModuleInit(): any {
    this.productService =
      this.productMicroService.getService<ProductMicroservice.ProductServiceClient>(
        'ProductService',
      );
  }

  createSamples() {
    return lastValueFrom(this.productService.createSamples({}));
  }
}
