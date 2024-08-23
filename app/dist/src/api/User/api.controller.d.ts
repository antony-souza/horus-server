import { ApiService, UserResponse } from './api.service';
import { BaseUserDto } from './DTO/base.user.dto';
import { UpdateUserDto } from './DTO/update.dto';
export declare class ApiController {
    private readonly HorusService;
    constructor(HorusService: ApiService);
    create(BaseUserDto: BaseUserDto): Promise<UserResponse>;
    update(id: string, UpdateUserDTO: UpdateUserDto): Promise<UserResponse>;
    delete(id: string): Promise<{
        message: string;
    }>;
}
