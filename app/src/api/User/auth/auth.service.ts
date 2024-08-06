import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HorusUser, Role } from '@prisma/client';

@Injectable()
export class AuthJwtService {
    constructor(private jwtService: JwtService) {}

    generateToken(user: HorusUser): string {
        const payload = { id: user.id, role: user.role };
        const secret = process.env.TOKEN_KEY;
        return this.jwtService.sign(payload, { secret });
    }

    verifyToken(token: string): { id: string; role: Role } {
        try {
            return this.jwtService.verify(token, { secret: process.env.TOKEN_KEY });
        } catch (error) {
            console.error("Erro ao verificar token:", error);
            throw new UnauthorizedException({
                message: 'Token inválido, meu patrão!',
                status: 401,
            });
        }
    }

    getToken(authorizationHeader: string): string {
        if (!authorizationHeader) {
            throw new UnauthorizedException({
                message: 'Token não fornecido',
                status: 401,
            });
        }

        const [type, token] = authorizationHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            throw new UnauthorizedException({
                message: 'Tipo de token inválido ou token não fornecido!',
                status: 401,
            });
        }
        return token;
    }
}