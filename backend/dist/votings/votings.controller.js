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
exports.VotingsController = void 0;
const common_1 = require("@nestjs/common");
const votings_service_1 = require("./votings.service");
const create_voting_dto_1 = require("./dto/create-voting.dto");
const update_voting_dto_1 = require("./dto/update-voting.dto");
const roles_decorator_1 = require("../roles/roles.decorator");
const role_enum_1 = require("../roles/role.enum");
const swagger_1 = require("@nestjs/swagger");
let VotingsController = class VotingsController {
    constructor(votingsService) {
        this.votingsService = votingsService;
    }
    create(createVotingDto) {
        return this.votingsService.create(createVotingDto);
    }
    findAll() {
        return this.votingsService.findAll();
    }
    findOne(id) {
        return this.votingsService.findOne(+id);
    }
    update(id, updateVotingDto) {
        return this.votingsService.update(+id, updateVotingDto);
    }
    remove(id) {
        return this.votingsService.remove(+id);
    }
};
exports.VotingsController = VotingsController;
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_voting_dto_1.CreateVotingDto]),
    __metadata("design:returntype", void 0)
], VotingsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], VotingsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VotingsController.prototype, "findOne", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_voting_dto_1.UpdateVotingDto]),
    __metadata("design:returntype", void 0)
], VotingsController.prototype, "update", null);
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], VotingsController.prototype, "remove", null);
exports.VotingsController = VotingsController = __decorate([
    (0, common_1.Controller)('votings'),
    __metadata("design:paramtypes", [votings_service_1.VotingsService])
], VotingsController);
//# sourceMappingURL=votings.controller.js.map