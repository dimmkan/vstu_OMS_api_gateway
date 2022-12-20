"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./modules/auth/auth.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_config_1 = require("./configs/jwt.config");
const nestjs_rmq_1 = require("nestjs-rmq");
const rmq_config_1 = require("./configs/rmq.config");
const passport_1 = require("@nestjs/passport");
const user_module_1 = require("./modules/user/user.module");
const employee_module_1 = require("./modules/employee/employee.module");
const order_module_1 = require("./modules/order/order.module");
const order_controller_1 = require("./modules/order/order.controller");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            auth_module_1.AuthModule,
            jwt_1.JwtModule.registerAsync((0, jwt_config_1.getJWTConfig)()),
            nestjs_rmq_1.RMQModule.forRootAsync((0, rmq_config_1.getRMQConfig)()),
            passport_1.PassportModule,
            user_module_1.UserModule,
            employee_module_1.EmployeeModule,
            order_module_1.OrderModule,
        ],
        controllers: [app_controller_1.AppController, order_controller_1.OrderController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map