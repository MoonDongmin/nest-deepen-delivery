import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import {
  ORDER_SERVICE,
  UserMeta,
  UserPayloadDto,
  OrderMicroservice,
} from '@app/common';

@Injectable()
export class OrderService implements OnModuleInit {
  orderService: OrderMicroservice.OrderServiceClient;
  constructor(
    @Inject(ORDER_SERVICE)
    private readonly orderMicroService: ClientGrpc,
  ) {}

  onModuleInit(): any {
    this.orderService =
      this.orderMicroService.getService<OrderMicroservice.OrderServiceClient>(
        'OrderService',
      );
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
    userPayload: UserPayloadDto,
  ) {
    return this.orderService.createOrder({
      ...createOrderDto,
      meta: {
        user: userPayload,
      },
    });
  }
}
