import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS, // 어떤 것으로 통신할 것인가
    options: {
      host: 'redis',
      port: 6379,
    },
  });

  await app.startAllMicroservices(); // MS 실행함
}

bootstrap();
