import { Module } from '@nestjs/common';
import { PaymentQueryModule } from './payment/payment-query.module';

@Module({
  imports: [PaymentQueryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
