import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as process from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'user_queue', // 같은 큐 안에서만 메시지 패턴이 정의가 됨
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices(); // MS 실행함
}

bootstrap();
