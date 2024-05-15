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
exports.VotesController = void 0;
const common_1 = require("@nestjs/common");
const votes_service_1 = require("./votes.service");
const create_vote_dto_1 = require("./dto/create-vote.dto");
const roles_decorator_1 = require("../roles/roles.decorator");
const role_enum_1 = require("../roles/role.enum");
const swagger_1 = require("@nestjs/swagger");
const set_user_id_guard_1 = require("../guards/set-user-id.guard");
let VotesController = class VotesController {
    constructor(votesService) {
        this.votesService = votesService;
    }
    create(createVoteDto, req) {
        return this.votesService.create(createVoteDto, req.body.userId);
    }
};
exports.VotesController = VotesController;
__decorate([
    (0, roles_decorator_1.Roles)(role_enum_1.Role.User),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(set_user_id_guard_1.SetUserIdGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vote_dto_1.CreateVoteDto, Object]),
    __metadata("design:returntype", void 0)
], VotesController.prototype, "create", null);
exports.VotesController = VotesController = __decorate([
    (0, common_1.Controller)('votes'),
    __metadata("design:paramtypes", [votes_service_1.VotesService])
], VotesController);
//# sourceMappingURL=votes.controller.js.map