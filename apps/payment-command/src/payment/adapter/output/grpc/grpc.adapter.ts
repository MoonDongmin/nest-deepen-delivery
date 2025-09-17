import { NetworkOutputPort } from '../../../port/output/network.output-port';
import { Inject, OnModuleInit } from '@nestjs/common';
import { NOTIFICATION_SERVICE } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { NotificationMicroservice } from '@app/common';
import { lastValueFrom } from 'rxjs';

export class GrpcAdapter implements NetworkOutputPort, OnModuleInit {
  notificationService: NotificationMicroservice.NotificationServiceClient;

  constructor(
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationMicroservice: ClientGrpc,
  ) {}
  onModuleInit(): any {
    this.notificationService =
      this.notificationMicroservice.getService<NotificationMicroservice.NotificationServiceClient>(
        'NotificationService',
      );
  }

  async sendNotification(orderId: string, to: string) {
    await lastValueFrom(
      this.notificationService.sendPaymentNotification({
        to,
        orderId,
      }),
    );
  }
}
