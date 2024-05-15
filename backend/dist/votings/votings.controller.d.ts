import { VotingsService } from './votings.service';
import { CreateVotingDto } from './dto/create-voting.dto';
import { UpdateVotingDto } from './dto/update-voting.dto';
export declare class VotingsController {
    private readonly votingsService;
    constructor(votingsService: VotingsService);
    create(createVotingDto: CreateVotingDto): Promise<import("./entities/voting.entity").Voting>;
    findAll(): Promise<import("./entities/voting.entity").Voting[]>;
    findOne(id: string): Promise<import("./entities/voting.entity").Voting>;
    update(id: string, updateVotingDto: UpdateVotingDto): Promise<import("./entities/voting.entity").Voting>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
