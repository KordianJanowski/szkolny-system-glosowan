import { Module, forwardRef } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { Vote } from './entities/vote.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { VotingsModule } from 'src/votings/votings.module';

@Module({
  imports: [TypeOrmModule.forFeature([Vote]), forwardRef(() => VotingsModule), UsersModule],
  controllers: [VotesController],
  providers: [VotesService],
  exports: [VotesService, TypeOrmModule.forFeature([Vote])]
})
export class VotesModule {}
