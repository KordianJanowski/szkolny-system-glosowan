import { Module, forwardRef } from '@nestjs/common';
import { VotingsService } from './votings.service';
import { VotingsController } from './votings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voting } from './entities/voting.entity';
import { VotesModule } from 'src/votes/votes.module';
import { UsersModule } from 'src/users/users.module';
import { Vote } from 'src/votes/entities/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Voting]), TypeOrmModule.forFeature([Vote])],
  controllers: [VotingsController],
  providers: [VotingsService],
  exports: [VotingsService, TypeOrmModule.forFeature([Voting])]
})
export class VotingsModule {}
