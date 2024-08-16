import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateProductDto {

    @IsString()
    @IsUUID()
    @IsOptional()
    id?: string

    @IsString()
    @IsOptional()
    name?: string;
 
    @IsNumber()
    @IsOptional()
    quantity?: number;

    @IsString()
    @IsOptional()
    packaging?: string

    @IsDateString()
    @IsOptional()
    expirationDate?: Date;
};