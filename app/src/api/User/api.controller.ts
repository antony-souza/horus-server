import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { HorusUser, Role } from '@prisma/client';
import { ApiService } from './api.service';
import { BaseUserDto } from './DTO/base.user.dto';
import { UpdateUserDto } from './DTO/update.dto';
import { Roles } from 'prisma/roles.decorator';
import { RolesGuard } from 'prisma/role.guard';
import { LoginAuthService } from './login.service';
import { JwtAuthGuard } from './auth/auth.guard';

@Controller('api')
@UseGuards(RolesGuard)
export class ApiController {
    constructor (
        private readonly HorusService : ApiService, 
        private readonly LoginAuthService  : LoginAuthService
    ){}

    @Post('/auth')
    async post(@Body() LoginDto:BaseUserDto) {
        return this.LoginAuthService.login(LoginDto)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @Roles(Role.ADMIN, Role.MANAGER, Role.CHIEF)
    async get(): Promise<HorusUser[]>{
        return this.HorusService.getUsers()
    }

    @UseGuards(JwtAuthGuard)
    @Post('/new-user')
    @Roles(Role.ADMIN)
    async create(@Body() BaseUserDto:BaseUserDto) {
        return this.HorusService.createUser(BaseUserDto)
    };

    @UseGuards(JwtAuthGuard)
    @Put('/:id')
    @Roles(Role.ADMIN,Role.MANAGER)
    async update(@Param('id') @Body() UpdateUserDTO:UpdateUserDto) {
        return this.HorusService.updateUser(UpdateUserDTO) 
    };

    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    @Roles(Role.ADMIN)
    async delete(@Param('id') @Body() BaseUserDto:BaseUserDto) {
        return this.HorusService.deleteUser(BaseUserDto)
    }
};
