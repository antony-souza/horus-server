"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const generateCod_1 = require("./other/generateCod");
const prisma = new client_1.PrismaClient();
let ProductService = class ProductService {
    async searchProductAdmin(query) {
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
            if (conditions.length === 0) {
                throw new common_1.BadRequestException('Nenhum critério de busca foi fornecido!');
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
        }
        catch (error) {
            console.error("Erro ao buscar produtos:", error);
            throw new common_1.InternalServerErrorException("Erro ao buscar produtos.");
        }
    }
    async searchProductManager(companyId, query) {
        try {
            const conditions = [{ companyId }];
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
                throw new common_1.BadRequestException('Nenhum critério de busca foi fornecido!');
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
        }
        catch (error) {
            console.error("Erro ao buscar produtos:", error);
            throw new common_1.InternalServerErrorException("Erro ao buscar produtos.");
        }
    }
    async createProduct(productData, userId, companyId) {
        try {
            const existingUser = await prisma.horusUser.findUnique({
                where: { id: userId },
            });
            if (!existingUser) {
                throw new common_1.BadRequestException(`Usuário com ID [${userId}] não encontrado!`);
            }
            const existingCompany = await prisma.horusCompany.findUnique({
                where: { id: companyId },
            });
            if (!existingCompany) {
                throw new common_1.BadRequestException(`Empresa com ID [${companyId}] não encontrada!`);
            }
            const existingProduct = await prisma.horusProduct.findFirst({
                where: {
                    name: productData.name,
                    userId,
                    companyId,
                },
            });
            if (existingProduct) {
                throw new common_1.BadRequestException(`Produto [${productData.name}] já existe para este usuário e empresa!Edite o produto na opção "Enviar Lote"`);
            }
            const newProduct = await prisma.horusProduct.create({
                data: {
                    name: productData.name,
                    code: (0, generateCod_1.generateCode)(),
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
        }
        catch (error) {
            console.error("Erro ao criar produto:", error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException("Erro interno ao criar produto.");
        }
    }
    async SendBatchProducts(updateProduct, userId, companyId) {
        try {
            const existingUser = await prisma.horusUser.findUnique({
                where: { id: userId },
            });
            if (!existingUser) {
                throw new common_1.BadRequestException(`Usuário com ID [${userId}] não encontrado!`);
            }
            const isAdmin = existingUser.role === 'ADMIN';
            if (!isAdmin) {
                const userCompany = existingUser.companyId;
                if (userCompany !== companyId) {
                    throw new common_1.ForbiddenException("Você não tem permissão para operar nessa empresa.");
                }
            }
            const existingCompany = await prisma.horusCompany.findUnique({
                where: { id: companyId },
            });
            if (!existingCompany) {
                throw new common_1.BadRequestException(`Empresa com ID [${companyId}] não encontrada!`);
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
                throw new common_1.BadRequestException(`Produto com código [${updateProduct.code}] não encontrado para este usuário e empresa!`);
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
        }
        catch (error) {
            console.error("Erro ao atualizar produto:", error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException("Erro interno ao atualizar produto.");
        }
    }
    ;
    async RemoveMerchandiseProducts(updateProduct, userId, companyId) {
        try {
            const existingUser = await prisma.horusUser.findUnique({
                where: { id: userId },
            });
            if (!existingUser) {
                throw new common_1.BadRequestException(`Usuário com ID [${userId}] não encontrado!`);
            }
            const isAdmin = existingUser.role === 'ADMIN';
            const existingCompany = await prisma.horusCompany.findUnique({
                where: { id: companyId },
            });
            if (!existingCompany) {
                throw new common_1.BadRequestException(`Empresa com ID [${companyId}] não encontrada!`);
            }
            const existingProduct = await prisma.horusProduct.findFirst({
                where: isAdmin ? {
                    code: updateProduct.code
                } : {
                    code: updateProduct.code,
                    userId,
                    companyId
                },
            });
            if (!existingProduct) {
                throw new common_1.BadRequestException(`Produto [${updateProduct.name}] não encontrado para este usuário e empresa!`);
            }
            const updatedProduct = await prisma.horusProduct.update({
                where: { id: existingProduct.id },
                data: {
                    quantity: existingProduct.quantity - updateProduct.quantity,
                    packaging: updateProduct.packaging,
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
        }
        catch (error) {
            console.error("Erro ao atualizar produto:", error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException("Erro interno ao atualizar produto.");
        }
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)()
], ProductService);
//# sourceMappingURL=product.service.js.map