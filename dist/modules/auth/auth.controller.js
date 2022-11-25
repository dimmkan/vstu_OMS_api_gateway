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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nestjs_rmq_1 = require("nestjs-rmq");
const jwt_guard_1 = require("../../guards/jwt.guard");
const user_decorator_1 = require("../../guards/user.decorator");
const contracts_1 = require("../../contracts");
let AuthController = class AuthController {
    constructor(rmqService) {
        this.rmqService = rmqService;
    }
    async register(dto) {
        try {
            return await this.rmqService.send(contracts_1.AuthRegister.topic, dto);
        }
        catch (error) {
            if (error instanceof nestjs_rmq_1.RMQError) {
                if (error.code && error.code === 400) {
                    throw new common_1.BadRequestException(error.message);
                }
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async confirm(code) {
        try {
            return await this.rmqService.send(contracts_1.AuthConfirm.topic, { confirm_code: code });
        }
        catch (error) {
            if (error instanceof nestjs_rmq_1.RMQError) {
                if (error.code && error.code === 400) {
                    throw new common_1.BadRequestException(error.message);
                }
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async login(dto, req) {
        const request = Object.assign(Object.assign({}, dto), { ip: req.headers['host'], agent: req.headers['user-agent'] });
        try {
            return await this.rmqService.send(contracts_1.AuthLogin.topic, request);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.UnauthorizedException(error.message);
            }
        }
    }
    async refresh(dto, req) {
        const request = Object.assign(Object.assign({}, dto), { ip: req.headers['host'], agent: req.headers['user-agent'] });
        try {
            return await this.rmqService.send(contracts_1.AuthRefresh.topic, request);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async logout(dto) {
        try {
            return await this.rmqService.send(contracts_1.AuthLogout.topic, dto);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async registerEmployee(dto) {
        try {
            return await this.rmqService.send(contracts_1.AuthRegisterEmployee.topic, dto);
        }
        catch (error) {
            if (error instanceof nestjs_rmq_1.RMQError) {
                if (error.code && error.code === 400) {
                    throw new common_1.BadRequestException(error.message);
                }
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async confirmEmployee(code) {
        try {
            return await this.rmqService.send(contracts_1.AuthConfirmEmployee.topic, { confirm_code: code });
        }
        catch (error) {
            if (error instanceof nestjs_rmq_1.RMQError) {
                if (error.code && error.code === 400) {
                    throw new common_1.BadRequestException(error.message);
                }
            }
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async loginEmployee(dto, req) {
        const request = Object.assign(Object.assign({}, dto), { ip: req.headers['host'], agent: req.headers['user-agent'] });
        try {
            return await this.rmqService.send(contracts_1.AuthLoginEmployee.topic, request);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.UnauthorizedException(error.message);
            }
        }
    }
    async refreshEmployee(dto, req) {
        const request = Object.assign(Object.assign({}, dto), { ip: req.headers['host'], agent: req.headers['user-agent'] });
        try {
            return await this.rmqService.send(contracts_1.AuthRefreshEmployee.topic, request);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async logoutEmployee(dto) {
        try {
            return await this.rmqService.send(contracts_1.AuthLogoutEmployee.topic, dto);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.AuthRegister.Request]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('register/confirm/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirm", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Post)('refresh'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Post)('logout'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.AuthLogout.Request]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    (0, common_1.Post)('employee/register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.AuthRegisterEmployee.Request]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerEmployee", null);
__decorate([
    (0, common_1.Get)('employee/register/confirm/:code'),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "confirmEmployee", null);
__decorate([
    (0, common_1.Post)('employee/login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginEmployee", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Post)('employee/refresh'),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshEmployee", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Post)('employee/logout'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.AuthLogoutEmployee.Request]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutEmployee", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [nestjs_rmq_1.RMQService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map