import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    packaging: string

    @IsString()
    @IsNotEmpty()
    expirationDate?: string;
}