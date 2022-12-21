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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const nestjs_rmq_1 = require("nestjs-rmq");
const contracts_1 = require("../../contracts");
const jwt_guard_1 = require("../../guards/jwt.guard");
const user_decorator_1 = require("../../guards/user.decorator");
let OrderController = class OrderController {
    constructor(rmqService) {
        this.rmqService = rmqService;
    }
    async createOrder(dto, { id }) {
        try {
            return await this.rmqService.send(contracts_1.CreateOrder.topic, Object.assign({ user_id: id }, dto));
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
    async changeOrderStatus(dto) {
        try {
            return await this.rmqService.send(contracts_1.ChangeOrderStatus.topic, dto);
        }
        catch (error) {
            if (error instanceof Error) {
                throw new common_1.InternalServerErrorException(error.message);
            }
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "createOrder", null);
__decorate([
    (0, common_1.UseGuards)(jwt_guard_1.JWTAuthGuard),
    (0, common_1.Post)('change-status'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contracts_1.ChangeOrderStatus.Request]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "changeOrderStatus", null);
OrderController = __decorate([
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [nestjs_rmq_1.RMQService])
], OrderController);
exports.OrderController = OrderController;
//# sourceMappingURL=order.controller.js.map