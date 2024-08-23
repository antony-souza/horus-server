import { HorusUser } from '@prisma/client';
import { UpdateUserDto } from './DTO/update.dto';
import { BaseUserDto } from './DTO/base.user.dto';
export interface UserResponse {
    message: string;
    user?: HorusUser;
    results?: HorusUser[];
}
export declare class ApiService {
    filterUsers(query: any): Promise<void>;
    createUser(userData: BaseUserDto): Promise<UserResponse>;
    updateUser(userData: UpdateUserDto): Promise<UserResponse>;
    deleteUser(id: string): Promise<{
        message: string;
    }>;
}
