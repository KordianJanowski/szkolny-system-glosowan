"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingsModule = void 0;
const common_1 = require("@nestjs/common");
const votings_service_1 = require("./votings.service");
const votings_controller_1 = require("./votings.controller");
const typeorm_1 = require("@nestjs/typeorm");
const voting_entity_1 = require("./entities/voting.entity");
const vote_entity_1 = require("../votes/entities/vote.entity");
let VotingsModule = class VotingsModule {
};
exports.VotingsModule = VotingsModule;
exports.VotingsModule = VotingsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([voting_entity_1.Voting]), typeorm_1.TypeOrmModule.forFeature([vote_entity_1.Vote])],
        controllers: [votings_controller_1.VotingsController],
        providers: [votings_service_1.VotingsService],
        exports: [votings_service_1.VotingsService, typeorm_1.TypeOrmModule.forFeature([voting_entity_1.Voting])]
    })
], VotingsModule);
//# sourceMappingURL=votings.module.js.map