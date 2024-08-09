import { IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { Role } from "@prisma/client";

export class DeleteUserDto {
    @IsUUID()
    @IsOptional()
    id?: string;

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    company?: string;

    @IsEnum(Role)
    @IsOptional()
    role?: Role;
}
