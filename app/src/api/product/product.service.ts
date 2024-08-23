import { Injectable, BadRequestException, InternalServerErrorException, ForbiddenException } from '@nestjs/common';
import {HorusProduct, PrismaClient } from '@prisma/client';
import { ProductDto } from './DTO/product.dto';
import { UpdateProductDto } from './DTO/update.dto';
import { generateCode } from './other/generateCod';


const prisma = new PrismaClient();

export interface ProductResponse {
    message: string;
    products?: HorusProduct[];
}

@Injectable()
export class ProductService {

    async searchProductAdmin(query: any): Promise<ProductResponse> {
        try {
            const conditions = [];

            if (query.code) {
                conditions.push({
                    code: {
                        contains: query.code,
                        mode: 'insensitive',
                    },
                });
            }
    
            if (query.name) {
                conditions.push({
                    name: {
                        contains: query.name,
                        mode: 'insensitive',
                    },
                });
            }
    
            if (query.expirationDate) {
                conditions.push({
                    expirationDate: query.expirationDate,
                });
            }
    
            if (query.user) {
                conditions.push({
                    user: {
                        contains: query.user,
                        mode: 'insensitive',
                    },
                });
            }
    
            if (query.company) {
                conditions.push({
                    company: {
                        contains: query.company,
                        mode: 'insensitive',
                    },
                });
            }
            
            if(conditions.length === 0){
                throw new BadRequestException('Nenhum critério de busca foi fornecido!')
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

    async searchProductManager(companyId: string ,query: any): Promise<ProductResponse> {
        try {
            const conditions:any[] = [{companyId}];

            if (query.code) {
                conditions.push({
                    code: {
                        contains: query.code,
                        mode: 'insensitive',
                    },
                });
            }
    
            if (query.name) {
                conditions.push({
                    name: {
                        contains: query.name,
                        mode: 'insensitive',
                    },
                });
            }
    
            if (query.expirationDate) {
                conditions.push({
                    expirationDate: query.expirationDate,
                });
            }
    
            if (query.user) {
                conditions.push({
                    user: {
                        contains: query.user,
                        mode: 'insensitive',
                    },
                });
            }
    
            if (query.company) {
                conditions.push({
                    company: {
                        contains: query.company,
                        mode: 'insensitive',
                    },
                });
            }
            
            if (conditions.length === 1) {
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
                throw new BadRequestException(`Produto [${productData.name}] já existe para este usuário e empresa!Edite o produto na opção "Enviar Lote"`);
            }



            const newProduct = await prisma.horusProduct.create({
                data: {
                    name: productData.name,
                    code: generateCode(),
                    quantity: productData.quantity,
                    packaging: productData.packaging,
                    expirationDate: productData.expirationDate,
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

    async SendBatchProducts(updateProduct: UpdateProductDto, userId: string, companyId: string): Promise<ProductResponse> {
        try {
            const existingUser = await prisma.horusUser.findUnique({
                where: { id: userId },
            });
    
            if (!existingUser) {
                throw new BadRequestException(`Usuário com ID [${userId}] não encontrado!`);
            }
            
            const isAdmin = existingUser.role === 'ADMIN';
    
            if (!isAdmin) {
                const userCompany = existingUser.companyId;
    
                if (userCompany !== companyId) {
                    throw new ForbiddenException("Você não tem permissão para operar nessa empresa.");
                }
            }
    
            const existingCompany = await prisma.horusCompany.findUnique({
                where: { id: companyId },
            });
    
            if (!existingCompany) {
                throw new BadRequestException(`Empresa com ID [${companyId}] não encontrada!`);
            }
    
            const existingProduct = await prisma.horusProduct.findFirst({
                where: isAdmin ? {
                    code: updateProduct.code,
                } : {
                    code: updateProduct.code,
                    userId,
                    companyId,
                },
            });
    
            if (!existingProduct) {
                 throw new BadRequestException(`Produto com código [${updateProduct.code}] não encontrado para este usuário e empresa!`);
            }
             

            const updatedProduct = await prisma.horusProduct.update({
                where: { id: existingProduct.id },
                data: {
                    quantity: existingProduct.quantity + updateProduct.quantity,
                    packaging: updateProduct.packaging,
                    expirationDate: updateProduct.expirationDate || existingProduct.expirationDate,
                    updatedAt: new Date()
                },
            });
    
            return {
                message: "Lote enviado com sucesso!",
                products: [updatedProduct],
            };
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
    
            if (error instanceof BadRequestException) {
                throw error;
            }
            throw new InternalServerErrorException("Erro interno ao atualizar produto.");
        }
    };

    async RemoveMerchandiseProducts(updateProduct: UpdateProductDto, userId: string, companyId: string): Promise<ProductResponse> {
        try {
            const existingUser = await prisma.horusUser.findUnique({
                where: { id: userId },
            });

            if (!existingUser) {
                throw new BadRequestException(`Usuário com ID [${userId}] não encontrado!`);
            }

            const isAdmin = existingUser.role === 'ADMIN';

            const existingCompany = await prisma.horusCompany.findUnique({
                where: { id: companyId },
            });

            if (!existingCompany) {
                throw new BadRequestException(`Empresa com ID [${companyId}] não encontrada!`);
            }

            const existingProduct = await prisma.horusProduct.findFirst({
                where: isAdmin ? {
                        code: updateProduct.code
                    }:{
                    code: updateProduct.code,
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
                    quantity: existingProduct.quantity - updateProduct.quantity,
                    packaging:  updateProduct.packaging,
                    updatedAt: new Date()
                },
            });

            if (updatedProduct.quantity <= 0) {
                await prisma.horusProduct.delete({
                    where: { id: existingProduct.id }
                });
    
                return {
                    message: "Mercadoria retirada com sucesso! O produto foi zerado e removido do sistema.",
                    products: []
                };
            }

            return {
                message: "Mercadoria retirada com sucesso!",
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