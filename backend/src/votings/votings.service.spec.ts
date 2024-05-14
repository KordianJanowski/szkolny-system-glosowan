import { Test, TestingModule } from '@nestjs/testing';
import { VotingsService } from './votings.service';

describe('VotingsService', () => {
  let service: VotingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VotingsService],
    }).compile();

    service = module.get<VotingsService>(VotingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
