import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Req as Request } from '../utils/types/request';
export declare class VotesController {
    private readonly votesService;
    constructor(votesService: VotesService);
    create(createVoteDto: CreateVoteDto, req: Request<{
        userId: number;
    }>): Promise<import("./entities/vote.entity").Vote>;
}
