import { HorusUser } from '@prisma/client';
import { ApiService } from './api.service';
import { BaseUserDto } from './DTO/base.user.dto';
import { UpdateUserDto } from './DTO/update.dto';
export interface UserResponse {
    message: string;
    user?: HorusUser;
    users?: HorusUser[];
}
export declare class ApiController {
    private readonly HorusService;
    constructor(HorusService: ApiService);
    get(): Promise<UserResponse>;
    create(BaseUserDto: BaseUserDto): Promise<UserResponse>;
    update(id: string, UpdateUserDTO: UpdateUserDto): Promise<UserResponse>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
