import { Vote } from "../../votes/entities/vote.entity";
export declare class Voting {
    id: number;
    title: string;
    content: string;
    options: string[];
    expiration_time: number;
    is_visible_before_voting_end: boolean;
    created_at: Date;
    votes: Vote[];
}
