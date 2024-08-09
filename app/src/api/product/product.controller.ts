import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ProductResponse, ProductService } from './product.service';
import { ProductDto } from './DTO/product.dto';
import { RolesGuard } from 'prisma/role.guard';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../User/auth/auth.guard';
import { Roles } from 'prisma/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/products')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Roles(Role.ADMIN, Role.MANAGER)
    @Post('/create')
    async createProduct(@Body() productData: ProductDto, @Request() req): Promise<ProductResponse> {
        // ID do usuário e empresa que esteja no token de auth
        const userId = req.user.id;
        const companyId = req.user.companyId;

        return this.productService.createProduct(productData, userId, companyId);
    }
}
