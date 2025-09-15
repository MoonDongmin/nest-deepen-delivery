import { Module } from '@nestjs/common';
import { PaymentController } from './adapter/input/payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './adapter/output/typeorm/entity/payment.entity';
import { PaymentService } from './application/payment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payment])],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
