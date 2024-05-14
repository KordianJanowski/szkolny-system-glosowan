import { Test, TestingModule } from '@nestjs/testing';
import { VotingsController } from './votings.controller';
import { VotingsService } from './votings.service';

describe('VotingsController', () => {
  let controller: VotingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VotingsController],
      providers: [VotingsService],
    }).compile();

    controller = module.get<VotingsController>(VotingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
