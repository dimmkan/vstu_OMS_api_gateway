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
exports.EmployeeController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const nestjs_rmq_1 = require("nestjs-rmq");
const contracts_1 = require("../../contracts");
const jwt_guard_1 = require("../../guards/jwt.guard");
const user_decorator_1 = require("../../guards/user.decorator");
let EmployeeController = class EmployeeController {
    constructor(rmqService) {
        this.rmqService = rmqService;
    }
    async getEmployeeInfo({ id }) {
        try {
            return await this.rmqService.send(contracts_1.EmployeeGetInfo.topic, { id });
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
    async updatEmployeeInfo({ id }, dto) {
        try {
            return await this.rmqService.send(contracts_1.EmployeeUpdateInfo.topic, { id, user_profile: dto });
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
    async getEmployeeAvatar({ id }) {
        try {
            return await this.rmqService.send(contracts_1.EmployeeGetAvatar.topic, { id });
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
    async setEmployeeAvatar({ id }, avatar) {
        try {
            return await this.rmqService.send(contracts_1.EmployeeSetAvatar.topic, {
                id,
                avatar: avatar.buffer.toString('base64'),
                filename: avatar.originalname,
            });
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
    async deleteEmployeeAvatar({ id }) {
        try {
            return await this.rmqService.send(contracts_1.EmployeeDeleteAvatar.topic, { id });
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
    async validateEmployeeEmail(dto) {
        try {
            return await this.rmqService.send(contracts_1.ValidateEmployeeEmail.topic, dto);
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
    async generateRefreshPasswordLink(dto) {
        try {
            return await this.rmqService.send(contracts_1.GenerateRefreshPasswordLinkEmployee.topic, dto);
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
            return await this.rmqService.send(contracts_1.ConfirmRefreshPasswordLinkEmployee.topic, { hash: code });
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
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Get)(),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployeeInfo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Put)(),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "updatEmployeeInfo", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Get)('avatar'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "getEmployeeAvatar", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Post)('avatar'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('avatar')),
    __param(0, (0, user_decorator_1.User)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.MaxFileSizeValidator({ maxSize: 5000000 }),
            new common_1.FileTypeValidator({ fileType: 'jpeg|png' }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "setEmployeeAvatar", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Delete)('avatar'),
    __param(0, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "deleteEmployeeAvatar", null);
__decorate([
    (0, common_1.Post)('validate-email'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "validateEmployeeEmail", null);
__decorate([
    (0, common_1.Post)('generate-refresh-link'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "generateRefreshPasswordLink", null);
__decorate([
    (0, common_1.Get)('confirm-refresh-link'),
    __param(0, (0, common_1.Query)('hash')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EmployeeController.prototype, "confirm", null);
EmployeeController = __decorate([
    (0, common_1.Controller)('employee'),
    __metadata("design:paramtypes", [nestjs_rmq_1.RMQService])
], EmployeeController);
exports.EmployeeController = EmployeeController;
//# sourceMappingURL=employee.controller.js.map