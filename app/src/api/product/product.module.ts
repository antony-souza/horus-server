import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { PrismaClient } from '@prisma/client';
import { ProductService } from './product.service';
import { AuthModule } from '../User/auth/auth.module';

@Module({
  imports: [AuthModule],
  providers: [ProductService, PrismaClient],
  controllers: [ProductController]
})
export class ProductModule {}
