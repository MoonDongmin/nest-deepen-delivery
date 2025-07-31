import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process    from 'node:process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.DB_URL);
  await app.listen(process.env.HTTP_PORT ?? 3000);
}

bootstrap();
