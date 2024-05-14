import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vote } from './entities/vote.entity';
import { CreateVoteDto } from './dto/create-vote.dto';
import { UsersService } from '../users/users.service';
import { VotingsService } from '../votings/votings.service';

@Injectable()
export class VotesService {
  constructor(
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
    private readonly usersService: UsersService,
    private readonly votingService: VotingsService
  ) {}

  async findAll(): Promise<Vote[]> {
    return await this.votesRepository.find();
  }

  async findOne(id: number): Promise<Vote> {
    return await this.votesRepository.findOneBy({ id });
  }

  async create(vote: CreateVoteDto, userId: number): Promise<Vote> {
    const votingId = vote.voting as unknown as number
    const voting = await this.votingService.findOne(votingId);

    if (!voting || (!vote.option && vote.option !== 0) || !vote.voting ) {
      throw new HttpException('This voting does not exist', HttpStatus.NOT_ACCEPTABLE);
    }

    if (voting.expiration_time < Number(new Date())) {
      throw new HttpException('Time of voting has gone', HttpStatus.GONE);
    }

    if (voting.options.length - 1 < vote.option || vote.option < 0) {
      throw new HttpException(`Option is out of range. Must be between 0 and ${voting.options.length - 1}`, HttpStatus.NOT_ACCEPTABLE);
    }

    const user = await this.usersService.findOneById(userId);

    if (user.votingsIds.includes(votingId)) {
      throw new HttpException('You can vote only once per voting', HttpStatus.CONFLICT);
    }

    const updatedUser = {
      ...user,
      votingsIds: [...user.votingsIds, vote.voting]
    }
    await this.usersService.update(userId, updatedUser)

    const newVote = this.votesRepository.create(vote);
    const createdVote = await this.votesRepository.save(newVote);

    return createdVote
  }

  async removeByVotingId(votingId: number) {
    return await this.votesRepository.delete({ voting: { id: votingId } });
  }
}
