import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  NotificationMicroservice,
  ORDER_SERVICE,
  PAYMENT_SERVICE,
  PRODUCT_SERVICE,
  USER_SERVICE,
  UserMicroservice,
  ProductMicroservice,
  OrderMicroservice,
} from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { BearerTokenMiddleware } from './auth/middleware/bearer-token.middleware';
import { join } from 'path';
import * as process from 'node:process';
import { traceInterceptor } from '@app/common/grpc/interceptor';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        USER_HOST: Joi.string().required(),
        USER_TCP_PORT: Joi.number().required(),
        PRODUCT_HOST: Joi.string().required(),
        PRODUCT_TCP_PORT: Joi.number().required(),
        ORDER_HOST: Joi.string().required(),
        ORDER_TCP_PORT: Joi.number().required(),
      }),
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: USER_SERVICE,
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
              channelOptions: {
                interceptors: [traceInterceptor('Gateway')],
              },
              package: UserMicroservice.protobufPackage,
              protoPath: join(process.cwd(), 'proto/user.proto'),
              url: configService.getOrThrow('USER_GRPC_URL'),
            },
          }),
          inject: [ConfigService],
        },
        {
          name: PRODUCT_SERVICE,
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
              channelOptions: {
                interceptors: [traceInterceptor('Gateway')],
              },
              package: ProductMicroservice.protobufPackage,
              protoPath: join(process.cwd(), 'proto/product.proto'),
              url: configService.getOrThrow('PRODUCT_GRPC_URL'),
            },
          }),
          inject: [ConfigService],
        },
        {
          name: ORDER_SERVICE,
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
              channelOptions: {
                interceptors: [traceInterceptor('Gateway')],
              },
              package: OrderMicroservice.protobufPackage,
              protoPath: join(process.cwd(), 'proto/order.proto'),
              url: configService.getOrThrow('ORDER_GRPC_URL'),
            },
          }),
          inject: [ConfigService],
        },
      ],
      isGlobal: true,
    }),
    OrderModule,
    ProductModule,
    AuthModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(BearerTokenMiddleware).forRoutes('order');
  }
}
