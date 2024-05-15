import { CreateVotingDto } from './dto/create-voting.dto';
import { UpdateVotingDto } from './dto/update-voting.dto';
import { Voting } from './entities/voting.entity';
import { Repository } from 'typeorm';
import { Vote } from '../votes/entities/vote.entity';
export declare class VotingsService {
    private readonly votingRepository;
    private readonly votesRepository;
    constructor(votingRepository: Repository<Voting>, votesRepository: Repository<Vote>);
    findAll(): Promise<Voting[]>;
    findOne(id: number): Promise<Voting>;
    create(voting: CreateVotingDto): Promise<Voting>;
    update(id: number, updateVotingDto: UpdateVotingDto): Promise<Voting>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
