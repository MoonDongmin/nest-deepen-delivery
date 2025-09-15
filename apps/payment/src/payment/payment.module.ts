import { Module } from '@nestjs/common';
import { PaymentController } from './adapter/input/payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PaymentService } from './application/payment.service';
import { PaymentEntity } from './adapter/output/typeorm/entity/payment.entity';
import { TypeormAdapter } from './adapter/output/typeorm/typeorm.adapter';
import { GrpcAdapter } from './adapter/output/grpc/grpc.adapter';
import { PortOneAdapter } from './adapter/output/portone/portone.adapter';
import { MongooseModule } from '@nestjs/mongoose';
import {
  PaymentDocument,
  PaymentSchema,
} from './adapter/output/moongoose/document/payment.document';
import { MongooseAdapter } from './adapter/output/moongoose/mongoose.adapter';

@Module({
  imports: [
    TypeOrmModule.forFeature([PaymentEntity]),
    MongooseModule.forFeature([
      {
        name: PaymentDocument.name,
        schema: PaymentSchema,
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [
    PaymentService,
    {
      provide: 'DatabaseOutputPort',
      useClass: MongooseAdapter,
    },
    {
      provide: 'PaymentOutputPort',
      useClass: PortOneAdapter,
    },
    {
      provide: 'NetworkOutputPort',
      useClass: GrpcAdapter,
    },
  ],
})
export class PaymentModule {}
