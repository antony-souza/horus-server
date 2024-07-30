import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaClient, HorusUser ,Role } from '@prisma/client';
import { UpdateUserDto } from './DTO/update.dto';
import { BaseUserDto } from './DTO/base.user.dto';

const prisma = new PrismaClient()

@Injectable()
export class ApiService {

    async getUsers(): Promise<HorusUser[]>{
        return await prisma.horusUser.findMany();
    }

    async createUser(userData: BaseUserDto): Promise<HorusUser> {
        try {
            
        const existingUser = await prisma.horusUser.findUnique({
            where:{email: userData.email},   
        })

        if(existingUser) {
            throw new BadRequestException(`Usuário com email ${userData.email} já existe!`)
        }

        return await prisma.horusUser.create({
          data: {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            phone: userData.phone,
            address: userData.address,
            role: userData.role || Role.USER
          }
        });
    } catch (error) {
        console.error(error)   
        throw new InternalServerErrorException("Erro interno ao criar usuário.")
    }
      } 
    
      async updateUser(userData: UpdateUserDto): Promise<HorusUser> {

        try {
            const existingUser = await prisma.horusUser.findUnique({
                where: { id: userData.id },
            });
    
            if (!existingUser) {
                throw new NotFoundException(`Usuário com ID ${userData.id} não encontrado!`);
            }
    
            return await prisma.horusUser.update({
                where: { id: userData.id },
                data: {
                    name: userData.name || existingUser.name,
                    email: userData.email || existingUser.email,
                    password: userData.password || existingUser.password,
                    phone: userData.phone || existingUser.phone,
                    address: userData.address || existingUser.address,
                    role: userData.role || existingUser.role,
                    updatedAt: new Date()
                },
            });
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            throw new InternalServerErrorException("Erro interno ao atualizar usuário.");
        }
    }

    async deleteUser(userData:BaseUserDto): Promise<HorusUser>{
            try {
                const existingUser = await prisma.horusUser.findUnique({
                    where: { id: userData.id },
                });
        
                if (!existingUser) {
                    throw new NotFoundException(`Usuário com ID ${userData.id} não encontrado!`);
                }
                return await prisma.horusUser.delete({
                    where: {id: userData.id}})
        } catch (error) {
            console.log(error)
        }
    }
}
