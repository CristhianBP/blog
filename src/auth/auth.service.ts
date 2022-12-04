import { Injectable } from '@nestjs/common';
import { CreateDtoUser } from './dto';

@Injectable()
export class AuthService {
  create(createDtoUser: CreateDtoUser) {}
}
