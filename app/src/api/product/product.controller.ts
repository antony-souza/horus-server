import { Controller, Post, Body, Request, UseGuards, Put, Get, BadRequestException, Query } from '@nestjs/common';
import { ProductResponse, ProductService } from './product.service';
import { RolesGuard } from 'prisma/role.guard';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../User/auth/auth.guard';
import { Roles } from 'prisma/roles.decorator';
import { ProductDto } from './DTO/product.dto';
import { ProductSearchDto } from './DTO/product.search.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Roles(Role.ADMIN, Role.MANAGER, Role.USER)
    @Get('search')
    async SearchProductForName(@Query() query: any):Promise<ProductResponse>{
        return this.productService.searchProduct(query)
    };

    @Roles(Role.ADMIN, Role.MANAGER)
    @Post('/create')
    async createProduct(@Body() productData: ProductDto, @Request() req): Promise<ProductResponse> {
        const userId = req.user.id;
        const companyId = req.user.companyId;

        return this.productService.createProduct(productData, userId, companyId);
    }

    @Roles(Role.ADMIN,Role.MANAGER)
    @Put('/edit')
    async updateValueProduct(@Body() productData: ProductDto, @Request() req): Promise<ProductResponse>{
        const userId = req.user.id
        const companyId = req.user.companyId
        
        return this.productService.updateValueProduct(productData, userId, companyId)
    }
}
