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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetUserIdGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("../utils/helpers/jwt");
const jwt_2 = require("@nestjs/jwt");
let SetUserIdGuard = class SetUserIdGuard {
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const { headers, body } = context.switchToHttp().getRequest();
        const token = (0, jwt_1.parseJwt)(headers.authorization);
        const user = this.jwtService.verify(token, {
            secret: process.env.JWT_SECRET,
        });
        body.userId = user.sub;
        return true;
    }
};
exports.SetUserIdGuard = SetUserIdGuard;
exports.SetUserIdGuard = SetUserIdGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector, jwt_2.JwtService])
], SetUserIdGuard);
//# sourceMappingURL=set-user-id.guard.js.map