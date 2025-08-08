import {
  Controller,
  Get,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { GetUserInfoDto } from './dto/get-user-info.dto';
import { RpcInterceptor } from '@app/common';
import { UserMicroservice } from '@app/common';

@Controller()
export class UserController implements UserMicroservice.UserServiceController {
  constructor(private readonly userService: UserService) {}

  getUserInfo(data: UserMicroservice.GetUserInfoRequest) {
    return this.userService.getUserById(data.userId);
  }
}
