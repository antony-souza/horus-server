import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import PrismaService from 'prisma/prisma.service';
import { ApiModule } from './api/api.module';

@Module({
  imports: [AppModule,PrismaModule,ApiModule],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService]
})
export class AppModule {}
