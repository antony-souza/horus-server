import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthService } from './login.service';
import { HorusUser } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private LoginAuthService:LoginAuthService) {
    super();
  }

  async validate(id:string): Promise<HorusUser> {
    const user = await this.LoginAuthService.validateToken(id);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
