import { CanActivate, ExecutionContext } from "@nestjs/common";
import { AuthJwtService } from "./auth.service";
export declare class JwtAuthGuard implements CanActivate {
    private authJwtService;
    constructor(authJwtService: AuthJwtService);
    canActivate(context: ExecutionContext): boolean;
}
