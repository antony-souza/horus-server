import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { HorusProduct, PrismaClient } from '@prisma/client';
import { ProductDto } from './DTO/product.dto';
import { UpdateProductDto } from './DTO/update.dto';

const prisma = new PrismaClient();

export interface ProductResponse {
    message: string;
    products?: HorusProduct[];
}

@Injectable()
export class ProductService {

    //Cara verifica com multiplos filtros e critérios
    async searchProduct(query: any): Promise<ProductResponse> {
        try {
            const conditions = [];

            switch (true) {
                case !!query.name: 
                    conditions.push({
                        name: { 
                            contains: query.name, 
                            mode: 'insensitive'
                        }
                    });
                    break;
                
                case !!query.expirationDate:
                    conditions.push({
                        expirationDate: new Date(query.expirationDate)
                    });
                    break;
                
                case !!query.user:
                    conditions.push({
                        user: { 
                            contains: query.user, 
                            mode: 'insensitive'
                        }
                    });
                    break;
                
                case !!query.company:  
                    conditions.push({
                        company: { 
                            contains: query.company, 
                            mode: 'insensitive'
                        }
                    });
                    break;
                
                default:
                    throw new BadRequestException('Nenhum critério de busca foi fornecido!');
            }


            const products = await prisma.horusProduct.findMany({
                where: {
                    AND: conditions,
                },
            });

            if (products.length === 0) {
                return {
                    message: 'Nenhum produto encontrado para a busca.',
                    products: [],
                };
            }

            return {
                message: 'Produtos encontrados!',
                products,
            };
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            throw new InternalServerErrorException("Erro ao buscar produtos.");
        }
    }

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

            const existingProduct = await prisma.horusProduct.findFirst({
                where: {
                    name: productData.name,
                    userId,
                    companyId,
                },
            });

            if (existingProduct) {
                throw new BadRequestException(`Produto [${productData.name}] já existe para este usuário e empresa!`);
            }

            const expirationDate = new Date(productData.expirationDate).toISOString();

            const newProduct = await prisma.horusProduct.create({
                data: {
                    name: productData.name,
                    quantity: productData.quantity,
                    packaging: productData.packaging,
                    expirationDate: expirationDate,
                    user: existingUser.name,
                    company: existingUser.company,
                    userId: existingUser.id,
                    companyId: existingCompany.id
                },
            });

            return {
                message: "Produto criado com sucesso!",
                products: [newProduct]
            };
        } catch (error) {
            console.error("Erro ao criar produto:", error);

            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException("Erro interno ao criar produto.");
        }
    }

    async updateValueProduct(updateProduct: UpdateProductDto, userId: string, companyId: string): Promise<ProductResponse> {
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

            const existingProduct = await prisma.horusProduct.findFirst({
                where: {
                    name: updateProduct.name,
                    userId,
                    companyId
                },
            });

            if (!existingProduct) {
                throw new BadRequestException(`Produto [${updateProduct.name}] não encontrado para este usuário e empresa!`);
            }

            const updatedProduct = await prisma.horusProduct.update({
                where: { id: existingProduct.id },
                data: {
                    quantity: existingProduct.quantity + updateProduct.quantity,
                    expirationDate: updateProduct.expirationDate
                },
            });

            return {
                message: "Produto atualizado com sucesso!",
                products: [updatedProduct]
            };
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);

            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException("Erro interno ao atualizar produto.");
        }
    }
}
