import { Role } from "@prisma/client";
export declare class BaseUserDto {
    id?: string;
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: string;
    company: string;
    companyId?: string;
    role?: Role;
}
