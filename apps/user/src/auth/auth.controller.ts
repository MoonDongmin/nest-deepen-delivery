import { Controller, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserMicroservice } from '@app/common';

@Controller('auth')
export class AuthController implements UserMicroservice.AuthServiceController {
  constructor(private readonly authService: AuthService) {}
  /**
   * MS에서 사용할 수 있는 것은 MessagePattern(), EventPattern()이 있음
   * MessagePattern: 응답을 다시 줄 수 있음
   * EventPattern: 그냥 던지기만 함(응답을 기대하지 않음)
   */
  parseBearerToken(payload: UserMicroservice.ParseBearerTokenRequest) {
    return this.authService.parseBearerToken(payload.token, false);
  }

  registerUser(registerDto: UserMicroservice.RegisterUserRequest) {
    const { token } = registerDto;
    if (token === null) {
      throw new UnauthorizedException('토큰을 입력해주세요!');
    }

    return this.authService.register(token, registerDto);
  }

  loginUser(loginDto: UserMicroservice.LoginUserRequest) {
    const { token } = loginDto;
    if (token === null) {
      throw new UnauthorizedException('토큰을 입력해주세요!');
    }
    return this.authService.login(token);
  }
}
