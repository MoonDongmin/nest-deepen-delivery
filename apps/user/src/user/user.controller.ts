import {
  Controller,
  Get,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod, MessagePattern } from '@nestjs/microservices';
import { GetUserInfoDto }   from './dto/get-user-info.dto';
import { GrpcInterceptor, RpcInterceptor } from '@app/common';
import { UserMicroservice } from '@app/common';
import { UserServiceControllerMethods } from '@app/common/grpc/proto/user';

@Controller()
@UserMicroservice.UserServiceControllerMethods()
@UseInterceptors(GrpcInterceptor)
export class UserController implements UserMicroservice.UserServiceController {
  constructor(private readonly userService: UserService) {}

  getUserInfo(request: UserMicroservice.GetUserInfoRequest) {
    return this.userService.getUserById(request.userId);
  }
}
