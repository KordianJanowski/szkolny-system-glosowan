import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VotingsService } from './votings.service';
import { CreateVotingDto } from './dto/create-voting.dto';
import { UpdateVotingDto } from './dto/update-voting.dto';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('votings')
export class VotingsController {
  constructor(private readonly votingsService: VotingsService) {}

  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @Post()
  create(@Body() createVotingDto: CreateVotingDto) {
    return this.votingsService.create(createVotingDto);
  }

  @Get()
  findAll() {
    return this.votingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.votingsService.findOne(+id);
  }

  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVotingDto: UpdateVotingDto) {
    return this.votingsService.update(+id, updateVotingDto);
  }

  @Roles(Role.Admin)
  @ApiBearerAuth('access-token')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.votingsService.remove(+id);
  }
}
