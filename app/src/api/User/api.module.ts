import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [ApiService],
  controllers: [ApiController],
  imports: [AuthModule, JwtModule]
})
export class ApiModule {}
