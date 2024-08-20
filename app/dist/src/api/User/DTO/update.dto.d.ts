import { Role } from "@prisma/client";
export declare class UpdateUserDto {
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    phone?: string;
    address?: string;
    company?: string;
    role?: Role;
}
