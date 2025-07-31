import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP, // 어떤 것으로 통신할 것인가
    options: {
      host: '0.0.0.0', // 모든 곳에서 통신을 받겠다
      port: parseInt(process.env.TC_PORT) || 3001,
    },
  });

  await app.startAllMicroservices(); // MS 실행함
  await app.listen(process.env.HTTP_PORT ?? 3000);
}

bootstrap();
