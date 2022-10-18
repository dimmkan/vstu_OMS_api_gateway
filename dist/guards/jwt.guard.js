"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWTAuthGuard = void 0;
const passport_1 = require("@nestjs/passport");
class JWTAuthGuard extends (0, passport_1.AuthGuard)('jwt') {
}
exports.JWTAuthGuard = JWTAuthGuard;
//# sourceMappingURL=jwt.guard.js.map