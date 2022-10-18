"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserId = void 0;
const common_1 = require("@nestjs/common");
exports.UserId = (0, common_1.createParamDecorator)((data, ctx) => {
    var _a;
    return (_a = ctx.switchToHttp().getRequest()) === null || _a === void 0 ? void 0 : _a.user;
});
//# sourceMappingURL=user.decorator.js.map