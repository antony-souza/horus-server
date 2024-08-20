"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const argon2_1 = require("argon2");
const prisma = new client_1.PrismaClient();
let ApiService = class ApiService {
    async getUsers() {
        const users = await prisma.horusUser.findMany();
        return {
            message: 'Usuários listados com sucesso!',
            users,
        };
    }
    async createUser(userData) {
        try {
            const existingUser = await prisma.horusUser.findUnique({
                where: { email: userData.email },
            });
            if (existingUser) {
                throw new common_1.BadRequestException('Usuário já existe, meu patrão!');
            }
            const existingCompany = await prisma.horusCompany.findUnique({
                where: { name: userData.company }
            });
            const companyId = existingCompany
                ? existingCompany.id
                : (await prisma.horusCompany.create({ data: { name: userData.company } })).id;
            const hashPass = await (0, argon2_1.hash)(userData.password, {
                type: argon2_1.argon2id,
                memoryCost: 2048,
                timeCost: 2,
                parallelism: 1,
            });
            const newUser = await prisma.horusUser.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    password: hashPass,
                    phone: userData.phone,
                    address: userData.address,
                    role: userData.role || client_1.Role.USER,
                    company: userData.company,
                    companyId: companyId,
                }
            });
            return {
                message: "Usuário criado com sucesso!",
                user: newUser,
            };
        }
        catch (error) {
            console.error("Erro ao criar usuário:", error);
            if (error instanceof common_1.BadRequestException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException("Erro interno ao criar usuário.");
        }
    }
    async updateUser(userData) {
        try {
            if (!userData.id) {
                throw new common_1.BadRequestException('ID do usuário não fornecido.');
            }
            const existingUser = await prisma.horusUser.findUnique({
                where: { id: userData.id },
            });
            if (!existingUser) {
                throw new common_1.NotFoundException(`Usuário com ID ${userData.id} não encontrado!`);
            }
            await prisma.horusUser.update({
                where: { id: userData.id },
                data: {
                    name: userData.name || existingUser.name,
                    email: userData.email || existingUser.email,
                    password: userData.password ? await (0, argon2_1.hash)(userData.password) : existingUser.password,
                    phone: userData.phone || existingUser.phone,
                    address: userData.address || existingUser.address,
                    role: userData.role || existingUser.role,
                    company: userData.company || existingUser.company,
                    updatedAt: new Date(),
                },
            });
            return {
                message: 'Usuário atualizado com sucesso!',
            };
        }
        catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException("Erro interno ao atualizar usuário.");
        }
    }
    async deleteUser(id) {
        try {
            const existingUser = await prisma.horusUser.findUnique({
                where: { id }
            });
            if (!existingUser) {
                throw new common_1.NotFoundException(`Usuário com ID [${id}] não encontrado!`);
            }
            await prisma.horusUser.delete({
                where: { id }
            });
            return {
                message: `Usuário com ID [${id}] foi deletado(a) com sucesso!`,
            };
        }
        catch (error) {
            console.error("Erro ao deletar usuário:", error);
            if (error instanceof common_1.NotFoundException) {
                throw error;
            }
            throw new common_1.InternalServerErrorException("Erro interno ao deletar usuário.");
        }
    }
};
exports.ApiService = ApiService;
exports.ApiService = ApiService = __decorate([
    (0, common_1.Injectable)()
], ApiService);
//# sourceMappingURL=api.service.js.map