import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClient, HorusUser, Role } from '@prisma/client';
import { UpdateUserDto } from './DTO/update.dto';
import { BaseUserDto } from './DTO/base.user.dto';
import { argon2id, hash } from 'argon2';

const prisma = new PrismaClient();

interface UserResponse {
    message: string;
    user?: HorusUser;
}

@Injectable()
export class ApiService {

    async getUsers(): Promise<{ message: string; users: HorusUser[] }> {
        const users = await prisma.horusUser.findMany();
        return {
            message: 'Usuários listados com sucesso!',
            users,
        };
    }

    async createUser(userData: BaseUserDto): Promise<UserResponse> {
        try {
            const existingUser = await prisma.horusUser.findUnique({
                where: { email: userData.email },
            });

            if (existingUser) {
                throw new BadRequestException('Usuário já existe, meu patrão!');
            }

            const hashPass = await hash(userData.password, {
                type: argon2id,
                memoryCost: 2048,
                timeCost: 2,
                parallelism: 1,
            });

            await prisma.horusUser.create({
                data: {
                    name: userData.name,
                    email: userData.email,
                    password: hashPass,
                    phone: userData.phone,
                    address: userData.address,
                    role: userData.role || Role.USER,
                }
            });

            return {
                message: "Usuário criado com sucesso!",
            };
        } catch (error) {

            console.error("Erro ao criar usuário:", error);

            if (error instanceof BadRequestException) {
                throw error; // Re-lança a exceção se já for uma BadRequestException
            }
            throw new InternalServerErrorException("Erro interno ao criar usuário.");
        }
    }

    async updateUser(userData: UpdateUserDto): Promise<UserResponse> {
        try {
            const existingUser = await prisma.horusUser.findUnique({
                where: { id: userData.id },
            });

            if (!existingUser) {
                throw new NotFoundException(`Usuário com ID ${userData.id} não encontrado!`);
            }

            await prisma.horusUser.update({
                where: { id: userData.id },
                data: {
                    name: userData.name || existingUser.name,
                    email: userData.email || existingUser.email,
                    password: userData.password ? await hash(userData.password) : existingUser.password,
                    phone: userData.phone || existingUser.phone,
                    address: userData.address || existingUser.address,
                    role: userData.role || existingUser.role,
                    updatedAt: new Date(),
                },
            });

            return {
                message: 'Usuário atualizado com sucesso!',

            };
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            if (error instanceof NotFoundException) {
                throw error; 
            }
            throw new InternalServerErrorException("Erro interno ao atualizar usuário.");
        }
    }

    async deleteUser(id: string): Promise<{ message: string }> {
        try {
            const existingUser = await prisma.horusUser.findUnique({
                where: { id }
            });

            if (!existingUser) {
                throw new NotFoundException(`Usuário com ID [${id}] não encontrado!`);
            }

            await prisma.horusUser.delete({
                where: { id }
            });

            return {
                message: `Usuário com ID [${id}] foi deletado(a) com sucesso!`,
            };
        } catch (error) {
            console.error("Erro ao deletar usuário:", error);
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException("Erro interno ao deletar usuário.");
        }
    }
}