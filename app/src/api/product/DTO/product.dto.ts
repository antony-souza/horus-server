import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsNotEmpty()
    packaging: string

    @IsString()
    @IsNotEmpty()
    expirationDate?: string;2
}