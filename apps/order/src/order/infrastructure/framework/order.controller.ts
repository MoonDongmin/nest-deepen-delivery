import { Controller, UseInterceptors } from '@nestjs/common';
import { OrderMicroservice, GrpcInterceptor } from '@app/common';
import { Metadata } from '@grpc/grpc-js';
import { CreateOrderUseCase } from '../../usecase/create-order.usecase';
import { StartDeliveryUseCase } from '../../usecase/start-delivery.usecase';
import { CreateOrderRequestMapper } from './mapper/create-order-request.mapper';
import { EventPattern } from '@nestjs/microservices';
import { CancelOrderUsecase } from '../../usecase/cancel-order.usecase';

@Controller('order')
@OrderMicroservice.OrderServiceControllerMethods()
export class OrderController
  implements OrderMicroservice.OrderServiceController
{
  constructor(
    private readonly createOrderUsecase: CreateOrderUseCase,
    private readonly startDeliveryUsecase: StartDeliveryUseCase,
    private readonly cancelOrderUsecase: CancelOrderUsecase,
  ) {}

  @UseInterceptors(GrpcInterceptor)
  async deliveryStarted(request: OrderMicroservice.DeliveryStartedRequest) {
    await this.startDeliveryUsecase.execute(request.id);
  }

  @UseInterceptors(GrpcInterceptor)
  async createOrder(
    request: OrderMicroservice.CreateOrderRequest,
    metadata: Metadata,
  ) {
    return this.createOrderUsecase.execute(
      new CreateOrderRequestMapper(request).toDomain(),
    );
  }

  @EventPattern('order.notification.fail')
  orderNotificationFail(orderId: string) {
    this.cancelOrderUsecase.execute(orderId);
  }
}
