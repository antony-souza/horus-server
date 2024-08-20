import { JwtService } from '@nestjs/jwt';
import { HorusUser, Role } from '@prisma/client';
export declare class AuthJwtService {
    private jwtService;
    constructor(jwtService: JwtService);
    generateToken(user: HorusUser): string;
    verifyToken(token: string): {
        id: string;
        role: Role;
        companyId: string;
    };
    getToken(authorizationHeader: string): string;
}
