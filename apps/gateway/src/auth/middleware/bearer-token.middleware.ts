import {
  Inject,
  Injectable,
  NestMiddleware,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ClientGrpc, ClientProxy } from '@nestjs/microservices';
import { constructMetadata, USER_SERVICE, UserMicroservice } from '@app/common';

@Injectable()
export class BearerTokenMiddleware implements NestMiddleware, OnModuleInit {
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

  async use(req: any, res: any, next: (error?: Error | any) => void) {
    // 1) Raw 토큰 가져오기
    const token = this.getRawToken(req);

    if (!token) {
      next();
      return;
    }

    // 2) User Auth에 토큰 던지기
    const payload = await this.verifyToken(token);

    // 3) req.user payload 붙이기
    req.user = payload;

    next();
  }

  private getRawToken(req: any): string | null {
    const authHeader = req.headers['authorization'];
    return authHeader;
  }

  private async verifyToken(token: string) {
    const result = await lastValueFrom(
      this.authService.parseBearerToken(
        { token },
        constructMetadata(BearerTokenMiddleware.name, 'verifyToken'),
      ),
    );

    return result;
  }
}
