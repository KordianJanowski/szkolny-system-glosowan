import { Max, Min } from "class-validator"
import { Voting } from "../../votings/entities/voting.entity"

export class CreateVoteDto {
  option: number

  @Min(0)
  @Max(10000000000000)
  voting: Voting
}
