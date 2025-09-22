import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { NotificationModule } from './notification/notification.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import {
  ORDER_SERVICE,
  OrderMicroservice,
  traceInterceptor,
} from '@app/common';
import { join } from 'path';
import * as process from 'node:process';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DB_URL: Joi.string().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.getOrThrow('DB_URL'),
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: ORDER_SERVICE,
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
              channelOptions: {
                interceptors: [traceInterceptor('Notification')],
              },
              package: OrderMicroservice.protobufPackage,
              protoPath: join(process.cwd(), 'proto/order.proto'),
              url: configService.getOrThrow('ORDER_GRPC_URL'),
            },
          }),
          inject: [ConfigService],
        },
        {
          name: 'KAFKA_SERVICE',
          useFactory: () => ({
            transport: Transport.KAFKA,
            options: {
              client: {
                clientId: 'notification',
                brokers: ['kafka:9092'],
              },
              consumer: {
                groupId: 'notification-consumer',
              },
            },
          }),
        },
      ],
      isGlobal: true,
    }),
    NotificationModule,
  ],
})
export class AppModule {}
