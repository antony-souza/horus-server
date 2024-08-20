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
exports.AuthJwtService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let AuthJwtService = class AuthJwtService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    generateToken(user) {
        const payload = { id: user.id, role: user.role, companyId: user.companyId };
        const secret = process.env.TOKEN_KEY;
        return this.jwtService.sign(payload, { secret });
    }
    verifyToken(token) {
        try {
            return this.jwtService.verify(token, { secret: process.env.TOKEN_KEY });
        }
        catch (error) {
            console.error("Erro ao verificar token:", error);
            throw new common_1.UnauthorizedException({
                message: 'Token inválido, meu patrão!',
                status: 401,
            });
        }
    }
    getToken(authorizationHeader) {
        if (!authorizationHeader) {
            throw new common_1.UnauthorizedException({
                message: 'Token não fornecido',
                status: 401,
            });
        }
        const [type, token] = authorizationHeader.split(' ');
        if (type !== 'Bearer' || !token) {
            throw new common_1.UnauthorizedException({
                message: 'Tipo de token inválido ou token não fornecido!',
                status: 401,
            });
        }
        return token;
    }
};
exports.AuthJwtService = AuthJwtService;
exports.AuthJwtService = AuthJwtService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthJwtService);
//# sourceMappingURL=auth.service.js.map