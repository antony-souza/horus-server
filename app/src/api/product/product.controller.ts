import { Controller, Post, Body, Request, UseGuards, Put, Get, Query } from '@nestjs/common';
import { ProductResponse, ProductService } from './product.service';
import { RolesGuard } from 'prisma/role.guard';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from '../User/auth/auth.guard';
import { Roles } from 'prisma/roles.decorator';
import { ProductDto } from './DTO/product.dto';
import { UpdateProductDto } from './DTO/update.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('product')
export class ProductController {

    constructor(private readonly productService: ProductService) {}

    @Roles(Role.ADMIN)
    @Get('/admin/search')
    async SearchForProductAsAdmin(@Query() query: any):Promise<ProductResponse>{
        return this.productService.searchProductAdmin(query)
    };

    @Roles(Role.MANAGER)
    @Get('/manager/search')
    async SearchForProductAsManager(@Request() req, @Query() query: any):Promise<ProductResponse>{

        const companyId = req.user.companyId

        return this.productService.searchProductManager(companyId,query)
    };

    @Roles(Role.ADMIN, Role.MANAGER)
    @Post('/create')
    async createProduct(@Body() productData: ProductDto, @Request() req): Promise<ProductResponse> {
        const userId = req.user.id;
        const companyId = req.user.companyId;

        return this.productService.createProduct(productData, userId, companyId);
    }

    @Roles(Role.ADMIN,Role.MANAGER)
    @Put('/sendbatch')
    async updateValueProduct(@Body() productData: UpdateProductDto, @Request() req): Promise<ProductResponse>{
        const userId = req.user.id
        const companyId = req.user.companyId
        
        return this.productService.SendBatchProducts(productData, userId, companyId)
    }

    @Roles(Role.ADMIN,Role.MANAGER)
    @Put('/remove/merchandise')
    async removeMerchandise(@Body() productData: UpdateProductDto, @Request() req): Promise<ProductResponse>{
        const userId = req.user.id
        const companyId = req.user.companyId
        
        return this.productService.RemoveMerchandiseProducts(productData, userId, companyId)
    }
}
