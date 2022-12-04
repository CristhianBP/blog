import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateDtoUser } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  create(@Body() createDtoUser: CreateDtoUser) {
    return this.authService.create(createDtoUser);
  }

  @Post('login')
  login(@Body() createDtoUser: CreateDtoUser) {
    return this.authService.create(createDtoUser);
  }
}
