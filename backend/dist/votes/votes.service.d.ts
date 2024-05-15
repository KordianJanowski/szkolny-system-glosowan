import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UsersService } from '../users/users.service';
import { VotingsService } from '../votings/votings.service';
export declare class VotesService {
    private readonly votesRepository;
    private readonly usersService;
    private readonly votingService;
    constructor(votesRepository: Repository<Vote>, usersService: UsersService, votingService: VotingsService);
    findAll(): Promise<Vote[]>;
    findOne(id: number): Promise<Vote>;
    create(vote: CreateVoteDto, userId: number): Promise<Vote>;
    removeByVotingId(votingId: number): Promise<import("typeorm").DeleteResult>;
}
