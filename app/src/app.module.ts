import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import PrismaService from 'prisma/prisma.service';
import { ApiModule } from './api/User/api.module';
import { AuthModule } from './api/User/auth/auth.module';
import { JwtAuthGuard } from './api/User/auth/auth.guard';



@Module({
  imports: [PrismaModule,ApiModule,AuthModule],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {}
