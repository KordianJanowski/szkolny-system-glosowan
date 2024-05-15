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
exports.VotesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const vote_entity_1 = require("./entities/vote.entity");
const users_service_1 = require("../users/users.service");
const votings_service_1 = require("../votings/votings.service");
let VotesService = class VotesService {
    constructor(votesRepository, usersService, votingService) {
        this.votesRepository = votesRepository;
        this.usersService = usersService;
        this.votingService = votingService;
    }
    async findAll() {
        return await this.votesRepository.find();
    }
    async findOne(id) {
        return await this.votesRepository.findOneBy({ id });
    }
    async create(vote, userId) {
        const votingId = vote.voting;
        const voting = await this.votingService.findOne(votingId);
        if (!voting || (!vote.option && vote.option !== 0) || !vote.voting) {
            throw new common_1.HttpException('This voting does not exist', common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        if (voting.expiration_time < Number(new Date())) {
            throw new common_1.HttpException('Time of voting has gone', common_1.HttpStatus.GONE);
        }
        if (voting.options.length - 1 < vote.option || vote.option < 0) {
            throw new common_1.HttpException(`Option is out of range. Must be between 0 and ${voting.options.length - 1}`, common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        const user = await this.usersService.findOneById(userId);
        if (user.votingsIds.includes(votingId)) {
            throw new common_1.HttpException('You can vote only once per voting', common_1.HttpStatus.CONFLICT);
        }
        const updatedUser = Object.assign(Object.assign({}, user), { votingsIds: [...user.votingsIds, vote.voting] });
        await this.usersService.update(userId, updatedUser);
        const newVote = this.votesRepository.create(vote);
        const createdVote = await this.votesRepository.save(newVote);
        return createdVote;
    }
    async removeByVotingId(votingId) {
        return await this.votesRepository.delete({ voting: { id: votingId } });
    }
};
exports.VotesService = VotesService;
exports.VotesService = VotesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(vote_entity_1.Vote)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService,
        votings_service_1.VotingsService])
], VotesService);
//# sourceMappingURL=votes.service.js.map