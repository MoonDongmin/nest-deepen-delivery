import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { USER_SERVICE, UserMicroservice } from '@app/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { RegisterDto } from './dto/register.dto';
import { constructMetadata } from '@app/common/grpc/utils/construct-metadata.util';

@Injectable()
export class AuthService implements OnModuleInit {
  authService: UserMicroservice.AuthServiceClient;

  constructor(
    @Inject(USER_SERVICE)
    private readonly userMicroService: ClientGrpc,
  ) {}

  onModuleInit(): any {
    this.authService =
      this.userMicroService.getService<UserMicroservice.AuthServiceClient>(
        'AuthService',
      );
  }

  register(token: string, registerDto: RegisterDto) {
    return lastValueFrom(
      this.authService.registerUser(
        {
          ...registerDto,
          token,
        },
        constructMetadata(AuthService.name, 'register'),
      ),
    );
  }

  login(token: string) {
    return lastValueFrom(
      this.authService.loginUser(
        {
          token,
        },
        constructMetadata(AuthService.name, 'login'),
      ),
    );
  }
}
