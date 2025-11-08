import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDoc } from './decorators/documentation/RegisterDoc';
import { LoginDoc } from './decorators/documentation/LoginDoc';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @RegisterDoc()
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }
  @LoginDoc()
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
}
