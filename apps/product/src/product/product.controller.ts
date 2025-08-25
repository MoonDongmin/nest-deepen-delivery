import { Controller,
  UseInterceptors
}                         from '@nestjs/common';
import { ProductService } from './product.service';
import { Payload } from '@nestjs/microservices';
import { GetProductsInfoDto }             from './dto/get-products-info.dto';
import {
  GrpcInterceptor,
  ProductMicroservice,
  UserMicroservice,
} from '@app/common';

@Controller('product')
@ProductMicroservice.ProductServiceControllerMethods()
@UseInterceptors(GrpcInterceptor)
export class ProductController
  implements ProductMicroservice.ProductServiceController
{
  constructor(private readonly productService: ProductService) {}

  async createSamples() {
    const resp = await this.productService.createSamples();

    return {
      success: resp,
    };
  }

  async getProductsInfo(request: GetProductsInfoDto) {
    const resp = await this.productService.getProductsInfo(request.productIds);
    return {
      products: resp,
    };
  }
}
