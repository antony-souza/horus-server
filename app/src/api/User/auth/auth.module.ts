import { Module } from '@nestjs/common';
import { AuthJwtService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoginAuthService } from '../login.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Passport } from 'passport';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({defaultStrategy:'bearer'})
  ],
  providers: [AuthJwtService,LoginAuthService,JwtService],
  controllers: [AuthController]
})
export class AuthModule {}
