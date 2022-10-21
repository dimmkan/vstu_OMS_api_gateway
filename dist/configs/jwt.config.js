"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJWTConfig = void 0;
const config_1 = require("@nestjs/config");
const getJWTConfig = () => ({
    imports: [config_1.ConfigModule],
    inject: [config_1.ConfigService],
    useFactory: () => ({
        secret: process.env.JWT_SECRET,
        verifyOptions: {
            algorithms: ['HS256', 'HS512'],
        },
    }),
});
exports.getJWTConfig = getJWTConfig;
//# sourceMappingURL=jwt.config.js.map