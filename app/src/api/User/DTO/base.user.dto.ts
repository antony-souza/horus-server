import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { Role } from "@prisma/client"

export class BaseUserDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    id?: string

    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsString()
    @IsNotEmpty()
    phone?: string

    @IsString()
    @IsNotEmpty()
    address?: string

    @IsString()
    @IsNotEmpty()
    company: string

    @IsString()
    @IsOptional()
    companyId?: string

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}