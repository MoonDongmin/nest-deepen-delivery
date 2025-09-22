import { Controller, UseInterceptors } from '@nestjs/common';
import { GrpcInterceptor, PaymentMicroservice } from '@app/common';
import { Metadata } from '@grpc/grpc-js';
import { PaymentMethod } from '../../domain/payment.domain';
import { PaymentService } from '../../application/payment.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
@PaymentMicroservice.PaymentServiceControllerMethods()
export class PaymentController
  implements PaymentMicroservice.PaymentServiceController
{
  constructor(private readonly paymentService: PaymentService) {}

  @UseInterceptors(GrpcInterceptor)
  makePayment(
    request: PaymentMicroservice.MakePaymentRequest,
    metadata: Metadata,
  ) {
    return this.paymentService.makePayment({
      ...request,
      paymentMethod: request.paymentMethod as PaymentMethod,
    });
  }

  @EventPattern('order.notification.fail')
  orderNotificationFail(orderId: string) {
    this.paymentService.cancelPayment(orderId);
  }
}
