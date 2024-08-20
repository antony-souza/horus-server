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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiController = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const api_service_1 = require("./api.service");
const base_user_dto_1 = require("./DTO/base.user.dto");
const update_dto_1 = require("./DTO/update.dto");
const roles_decorator_1 = require("../../../prisma/roles.decorator");
const role_guard_1 = require("../../../prisma/role.guard");
const auth_guard_1 = require("./auth/auth.guard");
let ApiController = class ApiController {
    constructor(HorusService) {
        this.HorusService = HorusService;
    }
    async get() {
        return this.HorusService.getUsers();
    }
    async create(BaseUserDto) {
        return this.HorusService.createUser(BaseUserDto);
    }
    ;
    async update(id, UpdateUserDTO) {
        UpdateUserDTO.id = id;
        return this.HorusService.updateUser(UpdateUserDTO);
    }
    ;
    async delete(id) {
        return this.HorusService.deleteUser(id);
    }
};
exports.ApiController = ApiController;
__decorate([
    (0, common_1.Get)('/all'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MANAGER),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('/new-user'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [base_user_dto_1.BaseUserDto]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MANAGER),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApiController.prototype, "delete", null);
exports.ApiController = ApiController = __decorate([
    (0, common_1.Controller)('api'),
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    __metadata("design:paramtypes", [api_service_1.ApiService])
], ApiController);
;
//# sourceMappingURL=api.controller.js.map