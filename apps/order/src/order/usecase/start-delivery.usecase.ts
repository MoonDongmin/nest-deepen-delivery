import { OrderOutputPort } from '../port/output/order.output-port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StartDeliveryUseCase {
  constructor(private readonly orderOutputPort: OrderOutputPort) {}

  async execute(orderId: string) {
    const order = await this.orderOutputPort.getOrder(orderId);

    order.startDelivery();
    await this.orderOutputPort.updateOrder(order);

    return order;
  }
}
