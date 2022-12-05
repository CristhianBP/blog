import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { UserAuth } from '../entities/auth.entity';
import { JwtPayload } from '../interfaces/JwtPayload.interface';

//TODO injectable es un servicio
@Injectable()
//TODO JwtStrategy extension de la clase PassportStrategy
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserAuth)
    private readonly userRepository: Repository<UserAuth>,

    configService: ConfigService,
  ) {
    // TODO super se utiliza para enviar configuracion a la clase padre
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  //TODO validate= validar el payload
  async validate(payload: JwtPayload): Promise<UserAuth> {
    const { id } = payload;

    const user = await this.userRepository.findOneBy({ id });

    if (!user) throw new UnauthorizedException('Token not valid');

    if (!user.isActive)
      throw new UnauthorizedException('User is inactive, talk with an admin');

    return user;
    //TODO request
  }
}
