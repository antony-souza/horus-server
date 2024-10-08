import { IsDateString, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class ProductSearchDto {
    
    @IsString()
    @IsUUID()
    @IsOptional()
    id?: string

    @IsString()
    @IsOptional()
    code?: string

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