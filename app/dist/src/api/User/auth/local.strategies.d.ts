import { Strategy } from 'passport-local';
import { LoginAuthService } from './login.service';
import { HorusUser } from '@prisma/client';
declare const LocalStrategy_base: new (...args: any[]) => Strategy;
export declare class LocalStrategy extends LocalStrategy_base {
    private LoginAuthService;
    constructor(LoginAuthService: LoginAuthService);
    validate(id: string): Promise<HorusUser>;
}
export {};
