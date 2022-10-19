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
const nestjs_rmq_1 = require("nestjs-rmq");
const contracts_1 = require("../../contracts");
const contracts_2 = require("../../contracts");
const contracts_3 = require("../../contracts");
let AuthController = class AuthController {
    constructor(rmqService) {
        this.rmqService = rmqService;
    }
    async register(dto) {
        try {
            return await this.rmqService.send(contracts_2.AuthRegister.topic, dto);
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
            return await this.rmqService.send(contracts_3.AuthConfirm.topic, { confirm_code: code });
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
    async login(dto) {
        try {
            return await this.rmqService.send(contracts_1.AuthLogin.topic, dto);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.UnauthorizedException(error.message);
            }
        }
    }
};
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_2.AuthRegister.Request]),
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
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.AuthLogin.Request]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [nestjs_rmq_1.RMQService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map