import { Controller, UseInterceptors } from '@nestjs/common';
import { OrderMicroservice, GrpcInterceptor } from '@app/common';
import { Metadata } from '@grpc/grpc-js';
import { CreateOrderUseCase } from '../../usecase/create-order.usecase';
import { StartDeliveryUseCase } from '../../usecase/start-delivery.usecase';
import { CreateOrderRequestMapper } from './mapper/create-order-request.mapper';

@Controller('order')
@OrderMicroservice.OrderServiceControllerMethods()
@UseInterceptors(GrpcInterceptor)
export class OrderController
  implements OrderMicroservice.OrderServiceController
{
  constructor(
    private readonly createOrderUsecase: CreateOrderUseCase,
    private readonly startDeliveryUsecase: StartDeliveryUseCase,
  ) {}

  async deliveryStarted(request: OrderMicroservice.DeliveryStartedRequest) {
    await this.startDeliveryUsecase.execute(request.id);
  }

  async createOrder(
    request: OrderMicroservice.CreateOrderRequest,
    metadata: Metadata,
  ) {
    return this.createOrderUsecase.execute(
      new CreateOrderRequestMapper(request).toDomain(),
    );
  }
}
