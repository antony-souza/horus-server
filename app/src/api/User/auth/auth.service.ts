import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HorusUser, Role } from '@prisma/client';

@Injectable()
export class AuthJwtService {

    constructor(
        private jwtService: JwtService) {}

    generateToken(user:HorusUser): string{
        const payload = {id:user.id, role: user.role}
        return this.jwtService.sign(payload);
    };

    verifyToken(token: string):{id:string, role:Role}{
        try {
            return this.jwtService.verify(token)
        } catch (error) {
            throw new UnauthorizedException('Token inválido meu patrão!')
        }
    }

    getToken(authorizationHeader: string): string{
        if(!authorizationHeader){
            throw new UnauthorizedException('Precisa de token para autorizar!')
        }

        const [type,token] = authorizationHeader.split(' ')
        if(type !== 'Bearer'){
            throw new UnauthorizedException('Tipo de token inválido!')
        }
        return token;
    }
        
};
