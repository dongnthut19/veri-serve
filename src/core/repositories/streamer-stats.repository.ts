import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { StreamerStats } from '../entities/streamer-stats.entity';

@Injectable()
export class StreamerStatsRepository extends BaseRepository<StreamerStats> {
  constructor(
    @InjectRepository(StreamerStats)
    streamerStatsRepository: Repository<StreamerStats>,
  ) {
    super(streamerStatsRepository);
  }
}
