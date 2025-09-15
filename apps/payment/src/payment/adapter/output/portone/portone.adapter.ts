import { PaymentOutputPort } from '../../../port/output/payment.output-port';
import { PaymentModel } from '../../../domain/payment.domain';

export class PortOneAdapter implements PaymentOutputPort {
  async processPayment(payment: PaymentModel): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log('결제 처리 중:', payment);
    return true;
  }
}
