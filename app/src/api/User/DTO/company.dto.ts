import { IsOptional, IsString, IsUUID } from "class-validator";

export class CompanyDto {
    @IsUUID()
    @IsString()
    id?: string

    @IsString()
    @IsOptional()
    name?: string
}