"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotesModule = void 0;
const common_1 = require("@nestjs/common");
const votes_service_1 = require("./votes.service");
const votes_controller_1 = require("./votes.controller");
const vote_entity_1 = require("./entities/vote.entity");
const typeorm_1 = require("@nestjs/typeorm");
const users_module_1 = require("../users/users.module");
const votings_module_1 = require("../votings/votings.module");
let VotesModule = class VotesModule {
};
exports.VotesModule = VotesModule;
exports.VotesModule = VotesModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([vote_entity_1.Vote]), (0, common_1.forwardRef)(() => votings_module_1.VotingsModule), users_module_1.UsersModule],
        controllers: [votes_controller_1.VotesController],
        providers: [votes_service_1.VotesService],
        exports: [votes_service_1.VotesService, typeorm_1.TypeOrmModule.forFeature([vote_entity_1.Vote])]
    })
], VotesModule);
//# sourceMappingURL=votes.module.js.map