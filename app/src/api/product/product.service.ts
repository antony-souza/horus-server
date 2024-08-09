import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { HorusProduct, PrismaClient } from '@prisma/client';
import { ProductDto } from './DTO/product.dto';

const prisma = new PrismaClient();

export interface ProductResponse {
    message: string;
    product?: HorusProduct;
}

@Injectable()
export class ProductService {

    async createProduct(productData: ProductDto, userId: string, companyId: string): Promise<ProductResponse> {
        try {
            
            const existingUser = await prisma.horusUser.findUnique({
                where: { id: userId },
            });

            if (!existingUser) {
                throw new BadRequestException(`Usuário com ID [${userId}] não encontrado!`);
            }

            const existingCompany = await prisma.horusCompany.findUnique({
                where: { id: companyId },
            });

            if (!existingCompany) {
                throw new BadRequestException(`Empresa com ID [${companyId}] não encontrada!`);
            }

            const newProduct = await prisma.horusProduct.create({
                data: {
                    name: productData.name,
                    quantity: productData.quantity,
                    packaging: productData.packaging,
                    validaty:  productData.expirationDate,
                    user: existingUser.name,
                    company: existingUser.company,
                    userId: existingUser.id,
                    companyId: existingUser.companyId
                },
            });

            return {
                message: "Produto criado com sucesso!",
                product: newProduct
            };
        } catch (error) {
            console.error("Erro ao criar produto:", error);

            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException("Erro interno ao criar produto.");
        }
    }
}
