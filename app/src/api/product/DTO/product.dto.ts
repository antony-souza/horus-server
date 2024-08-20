import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class ProductDto {
    
    @IsString()
    @IsUUID()
    @IsOptional()
    id?: string

    @IsString()
    @IsOptional()
    code?: string

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    packaging: string

    @IsDateString()
    @IsNotEmpty()
    expirationDate?: Date;
};