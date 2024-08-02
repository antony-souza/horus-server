import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthJwtService } from "./auth.service";
import { Reflector } from "@nestjs/core";

@Injectable()

export class JwtAuthGuard implements CanActivate {
    constructor(private authJwtService: AuthJwtService, private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers.authorizationHeader;

        if(!authorizationHeader){
            throw new UnauthorizedException()
        }

        const token = this.authJwtService.getToken(authorizationHeader);
        const user = this.authJwtService.verifyToken(token)
        
        request.user = user

        return true
    }

}