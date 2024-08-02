import { Injectable, UnauthorizedException } from "@nestjs/common";
import { HorusUser, PrismaClient } from "@prisma/client";
import { BaseUserDto } from "./DTO/base.user.dto";
import { verify } from "argon2";
import { AuthJwtService } from "./auth/auth.service";

@Injectable()
export class LoginAuthService {

    constructor(

        private readonly prisma:PrismaClient,
        private readonly AuthToken:AuthJwtService) {}

    async login(userData: BaseUserDto): Promise<{token:string; user:HorusUser}>{
        const {email, password} = userData;

        const user = await this.prisma.horusUser.findUnique({
            where: {email},
        });

        if(!user || !(await verify(user.password, password))){
            throw new UnauthorizedException('Email ou senha inválidos!')
        }

        const token = this.AuthToken.generateToken(user)
    
        return {token,user};
    }

    async validateToken(token: string): Promise<HorusUser> {
        const payload =    this.AuthToken.verifyToken(token); 
        const user = await this.prisma.horusUser.findUnique({
          where: { id: payload.id}
        });
        return user;
      }
}