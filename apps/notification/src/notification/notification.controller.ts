import {
  Controller,
  Get,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotificationService } from './notification.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  RpcInterceptor,
  NotificationMicroservice,
  UserMicroservice,
  GrpcInterceptor,
} from '@app/common';
import { SendPaymentNotificationDto } from './dto/send-payment-notification.dto';
import { Metadata } from '@grpc/grpc-js';

@Controller()
@UseInterceptors(GrpcInterceptor)
@NotificationMicroservice.NotificationServiceControllerMethods()
export class NotificationController
  implements NotificationMicroservice.NotificationServiceController
{
  constructor(private readonly notificationService: NotificationService) {}

  async sendPaymentNotification(
    request: SendPaymentNotificationDto,
    metadata: Metadata,
  ) {
    const resp = (
      await this.notificationService.sendPaymentNotification(request, metadata)
    ).toJSON();

    return {
      ...resp,
      status: resp.status.toString(),
    };
  }
}
