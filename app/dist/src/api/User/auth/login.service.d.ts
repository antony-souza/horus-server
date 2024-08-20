import { HorusUser, PrismaClient } from "@prisma/client";
import { AuthJwtService } from "./auth.service";
import { SigInDto } from "./DTO/auth.dto";
export declare class LoginAuthService {
    private readonly prisma;
    private readonly AuthToken;
    constructor(prisma: PrismaClient, AuthToken: AuthJwtService);
    login(userData: SigInDto): Promise<{
        token: string;
    }>;
    validateToken(token: string): Promise<HorusUser>;
}
