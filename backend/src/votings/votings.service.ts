import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { CreateVotingDto } from './dto/create-voting.dto';
import { UpdateVotingDto } from './dto/update-voting.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Voting } from './entities/voting.entity';
import { Repository } from 'typeorm';
import { VotesService } from '../votes/votes.service';
import { Vote } from '../votes/entities/vote.entity';

@Injectable()
export class VotingsService {
  constructor(
    @InjectRepository(Voting)
    private readonly votingRepository: Repository<Voting>,
    @InjectRepository(Vote)
    private readonly votesRepository: Repository<Vote>,
  ) {}

  async findAll(): Promise<Voting[]> {
    return await this.votingRepository.find();
  }

  async findOne(id: number): Promise<Voting> {
    const voting = await this.votingRepository.findOne({ where: { id }, relations: { votes: true } });

    if (voting.is_visible_before_voting_end || voting.expiration_time < Number(new Date())) {
      return voting
    }

    return await this.votingRepository.findOne({ where: { id }})
  }

  async create(voting: CreateVotingDto): Promise<Voting> {
    const newVoting = this.votingRepository.create(voting);
    return await this.votingRepository.save(newVoting);
  }

  async update(id: number, updateVotingDto: UpdateVotingDto) {
    const existingEntity = await this.votingRepository.findOneBy({ id });

    if (!existingEntity) {
      throw new NotFoundException(`Voting with id ${id} not found`);
    }

    const updatedEntity = this.votingRepository.merge(existingEntity, updateVotingDto);
    return await this.votingRepository.save(updatedEntity);
  }

  async remove(id: number) {
    await this.votesRepository.delete({ voting: { id } })
    return await this.votingRepository.delete(id);
  }
}
