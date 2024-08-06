import { Injectable, UnauthorizedException } from "@nestjs/common";
import { HorusUser, PrismaClient } from "@prisma/client";
import { verify } from "argon2";
import { AuthJwtService } from "./auth.service";
import { SigInDto } from "./DTO/auth.dto";

@Injectable()
export class LoginAuthService {

    constructor(

        private readonly prisma:PrismaClient,
        private readonly AuthToken:AuthJwtService) {}

    async login(userData: SigInDto): Promise<{token:string}>{
        const {email, password} = userData;

        const user = await this.prisma.horusUser.findUnique({
            where: {email},
        });

        if(!user || !(await verify(user.password, password))){
            throw new UnauthorizedException('Email ou senha inválidos!')
        }

        const token = this.AuthToken.generateToken(user)
    
        return {token};
    }

    async validateToken(token: string): Promise<HorusUser> {
        const payload =    this.AuthToken.verifyToken(token); 
        const user = await this.prisma.horusUser.findUnique({
          where: { id: payload.id}
        });
        return user;
      }
}