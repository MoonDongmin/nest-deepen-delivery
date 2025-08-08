import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import { Payload } from '@nestjs/microservices';
import { GetProductsInfoDto } from './dto/get-products-info.dto';
import { ProductMicroservice } from '@app/common';

@Controller('product')
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

  async getProductsInfo(@Payload() data: GetProductsInfoDto) {
    const resp = await this.productService.getProductsInfo(data.productIds);
    return {
      products: resp,
    };
  }
}
