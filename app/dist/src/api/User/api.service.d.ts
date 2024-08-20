import { HorusUser } from '@prisma/client';
import { UpdateUserDto } from './DTO/update.dto';
import { BaseUserDto } from './DTO/base.user.dto';
interface UserResponse {
    message: string;
    user?: HorusUser;
}
export declare class ApiService {
    getUsers(): Promise<{
        message: string;
        users: HorusUser[];
    }>;
    createUser(userData: BaseUserDto): Promise<UserResponse>;
    updateUser(userData: UpdateUserDto): Promise<UserResponse>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
export {};
