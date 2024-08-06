import { Module } from '@nestjs/common';
import { AuthJwtService } from './auth.service';
import { AuthController } from './auth.controller';
import { LoginAuthService } from './login.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [
    PassportModule.register({defaultStrategy:'bearer'}),
    JwtModule.register({
      global: true,
      signOptions: { expiresIn:'1h' },
      secret: process.env.TOKEN_KEY,
    })
  ],
  providers: [AuthJwtService,LoginAuthService,PrismaClient],
  controllers: [AuthController],
  exports: [JwtModule, AuthJwtService]
})

export class AuthModule {}
