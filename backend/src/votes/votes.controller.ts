import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards } from '@nestjs/common';
import { VotesService } from './votes.service';
import { CreateVoteDto } from './dto/create-vote.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { Req as Request } from 'src/utils/types/request';
import { ApiBearerAuth } from '@nestjs/swagger';
import { SetUserIdGuard } from 'src/guards/set-user-id.guard';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Roles(Role.User)
  @ApiBearerAuth('access-token')
  @UseGuards(SetUserIdGuard)
  @Post()
  create(@Body() createVoteDto: CreateVoteDto, @Req() req: Request<{ userId: number }>) {
    return this.votesService.create(createVoteDto, req.body.userId);
  }
}
