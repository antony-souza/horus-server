import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [AuthModule, JwtModule],
  controllers: [ApiController],
  providers: [ApiService, , PrismaClient],
  
  
})
export class ApiModule {}
