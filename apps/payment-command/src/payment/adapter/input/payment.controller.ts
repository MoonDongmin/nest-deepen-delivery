import { Controller, UseInterceptors } from '@nestjs/common';
import { GrpcInterceptor, PaymentMicroservice } from '@app/common';
import { Metadata } from '@grpc/grpc-js';
import { PaymentMethod } from '../../domain/payment.domain';
import { PaymentService } from '../../application/payment.service';

@Controller()
@PaymentMicroservice.PaymentServiceControllerMethods()
@UseInterceptors(GrpcInterceptor)
export class PaymentController
  implements PaymentMicroservice.PaymentServiceController
{
  constructor(private readonly paymentService: PaymentService) {}

  makePayment(
    request: PaymentMicroservice.MakePaymentRequest,
    metadata: Metadata,
  ) {
    return this.paymentService.makePayment({
      ...request,
      paymentMethod: request.paymentMethod as PaymentMethod,
    });
  }
}
