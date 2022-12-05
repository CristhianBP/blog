import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDtoUser, LoginUserDto } from './dto';
import { UserAuth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/JwtPayload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserAuth)
    private readonly authUserRepository: Repository<UserAuth>,

    private readonly jwtService: JwtService,
  ) {}

  //TODO create userAuth
  async create(createDtoUser: CreateDtoUser) {
    try {
      const { password, ...userData } = createDtoUser;

      const user = this.authUserRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.authUserRepository.save(user);
      delete user.password;

      //TODO has token

      // return user;
      return {
        ...user,
        token: this.getJwtToken({ id: user.id }),
      };
    } catch (error) {
      this.handleErrors(error);
    }
  }
  //TODO login userAuth
  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.authUserRepository.findOne({
      where: { email },
      select: { email: true, password: true },
    });

    if (!user) throw new UnauthorizedException('email no valid');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('credentials are not valid');

    //TODO has token
    return {
      ...user,
      token: this.getJwtToken({ id: user.id }),
    };
  }

  private getJwtToken(jwtPayload: JwtPayload) {
    const token = this.jwtService.sign(jwtPayload);
    return token;
  }

  private handleErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('please check server log');
  }
}
