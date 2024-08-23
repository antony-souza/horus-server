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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const role_guard_1 = require("../../../prisma/role.guard");
const client_1 = require("@prisma/client");
const auth_guard_1 = require("../User/auth/auth.guard");
const roles_decorator_1 = require("../../../prisma/roles.decorator");
const product_dto_1 = require("./DTO/product.dto");
const update_dto_1 = require("./DTO/update.dto");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async SearchForProductAsAdmin(query) {
        return this.productService.searchProductAdmin(query);
    }
    ;
    async SearchForProductAsManager(req, query) {
        const companyId = req.user.companyId;
        return this.productService.searchProductManager(companyId, query);
    }
    ;
    async createProduct(productData, req) {
        const userId = req.user.id;
        const companyId = req.user.companyId;
        return this.productService.createProduct(productData, userId, companyId);
    }
    async updateValueProduct(productData, req) {
        const userId = req.user.id;
        const companyId = req.user.companyId;
        return this.productService.SendBatchProducts(productData, userId, companyId);
    }
    async removeMerchandise(productData, req) {
        const userId = req.user.id;
        const companyId = req.user.companyId;
        return this.productService.RemoveMerchandiseProducts(productData, userId, companyId);
    }
};
exports.ProductController = ProductController;
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN),
    (0, common_1.Get)('/admin/search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "SearchForProductAsAdmin", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.MANAGER),
    (0, common_1.Get)('/manager/search'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "SearchForProductAsManager", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MANAGER),
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.ProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MANAGER),
    (0, common_1.Put)('/sendbatch'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "updateValueProduct", null);
__decorate([
    (0, roles_decorator_1.Roles)(client_1.Role.ADMIN, client_1.Role.MANAGER),
    (0, common_1.Put)('/remove/merchandise'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "removeMerchandise", null);
exports.ProductController = ProductController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.JwtAuthGuard, role_guard_1.RolesGuard),
    (0, common_1.Controller)('/product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map