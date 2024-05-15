"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJwt = void 0;
const common_1 = require("@nestjs/common");
const parseJwt = (jwt) => {
    try {
        return jwt.split(' ')[1];
    }
    catch (_a) {
        throw new common_1.UnauthorizedException();
    }
};
exports.parseJwt = parseJwt;
//# sourceMappingURL=jwt.js.map