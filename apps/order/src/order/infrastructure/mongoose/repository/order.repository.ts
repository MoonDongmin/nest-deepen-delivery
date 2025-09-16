import { OrderOutputPort } from '../../../port/output/order.output-port';
import { OrderEntity } from '../../../domain/order.entity';
import { Model } from 'mongoose';
import { OrderDocument } from '../entity/order.entity';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDocumentMapper } from '../mapper/order-document.mapper';

export class OrderRepository implements OrderOutputPort {
  constructor(
    @InjectModel(OrderDocument.name)
    private readonly orderRepository: Model<OrderDocument>,
  ) {}
  async createOrder(orderId: OrderEntity): Promise<OrderEntity> {
    const order = await this.orderRepository.findById(orderId);

    return new OrderDocumentMapper(order).toDomain();
  }

  async getOrder(order: string): Promise<OrderEntity> {
    const result = await this.orderRepository.create(order);

    return new OrderDocumentMapper(result).toDomain();
  }

  async updateOrder(order: OrderEntity): Promise<OrderEntity> {
    const { id, ...rest } = order;
    const result = await this.orderRepository.findByIdAndUpdate(id, rest);

    return new OrderDocumentMapper(result).toDomain();
  }
}
