"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAuthService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const argon2_1 = require("argon2");
const auth_service_1 = require("./auth.service");
let LoginAuthService = class LoginAuthService {
    constructor(prisma, AuthToken) {
        this.prisma = prisma;
        this.AuthToken = AuthToken;
    }
    async login(userData) {
        const { email, password } = userData;
        const user = await this.prisma.horusUser.findUnique({
            where: { email },
        });
        if (!user || !(await (0, argon2_1.verify)(user.password, password))) {
            throw new common_1.UnauthorizedException('Email ou senha inválidos!');
        }
        const token = this.AuthToken.generateToken(user);
        return { token };
    }
    async validateToken(token) {
        const payload = this.AuthToken.verifyToken(token);
        const user = await this.prisma.horusUser.findUnique({
            where: { id: payload.id }
        });
        return user;
    }
};
exports.LoginAuthService = LoginAuthService;
exports.LoginAuthService = LoginAuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_1.PrismaClient,
        auth_service_1.AuthJwtService])
], LoginAuthService);
//# sourceMappingURL=login.service.js.map