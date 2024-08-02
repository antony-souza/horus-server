import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [ApiService],
  controllers: [ApiController],
  imports: [AuthModule]
})
export class ApiModule {}
