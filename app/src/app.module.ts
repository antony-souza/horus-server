import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import PrismaService from 'prisma/prisma.service';
import { ApiModule } from './api/User/api.module';
import { AuthModule } from './api/User/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ProductModule } from './api/product/product.module';

@Module({
  imports: [PrismaModule,ApiModule,AuthModule,JwtModule, ProductModule],
  controllers: [],
  providers: [PrismaService]
})
export class AppModule {}
