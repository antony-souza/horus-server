import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HorusUser, Role } from '@prisma/client';
import { ApiService } from './api.service';
import { BaseUserDto } from './DTO/base.user.dto';
import { UpdateUserDto } from './DTO/update.dto';
import { Roles } from 'prisma/roles.decorator';
import { RolesGuard } from 'prisma/role.guard';
import { JwtAuthGuard } from './auth/auth.guard';
import { CompanyDto } from './DTO/company.dto';

export interface UserResponse {
    message: string;
    user?: HorusUser; 
    users?: HorusUser[]; 
}

@Controller('api')
@UseGuards(JwtAuthGuard,RolesGuard)
export class ApiController {
    constructor (
        private readonly HorusService : ApiService, 
    ){}

    @Get('/all')
    @Roles(Role.ADMIN, Role.MANAGER)
    async get(): Promise<UserResponse>{
        return this.HorusService.getUsers()
    }
    
    @Post('/new-user')
    @Roles(Role.ADMIN)
    async create(@Body() BaseUserDto:BaseUserDto):Promise<UserResponse> {
        return this.HorusService.createUser(BaseUserDto)
    };

    @Put('/:id')
    @Roles(Role.ADMIN,Role.MANAGER)
    async update(@Param('id') id:string, @Body() UpdateUserDTO:UpdateUserDto):Promise<UserResponse> {
        UpdateUserDTO.id = id
        return this.HorusService.updateUser(UpdateUserDTO) 
    };

    @Delete('/delete/:id')
    @Roles(Role.ADMIN)
    async delete(@Param('id') @Body() id:string):Promise<{message:string}> {
        return this.HorusService.deleteUser(id)
    }
};
