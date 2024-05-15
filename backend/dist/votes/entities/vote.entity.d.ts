import { Voting } from "../../votings/entities/voting.entity";
export declare class Vote {
    id: number;
    option: number;
    voting: Voting;
    created_at: Date;
}
