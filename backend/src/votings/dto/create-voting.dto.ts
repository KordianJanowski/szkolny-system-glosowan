import { ArrayMaxSize, IsArray, IsBoolean, Max, MaxLength, MinLength } from "class-validator"

export class CreateVotingDto {
  @MinLength(4)
  @MaxLength(150)
  title: string

  @MaxLength(1500)
  content: string

  @IsArray()
  @ArrayMaxSize(100)
  options: string[]

  @Max(94670856000000)
  expiration_time: number

  @IsBoolean()
  is_visible_before_voting_end: boolean
}
