import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StreamerController } from './streamer.controller';
import { StreamerService } from './streamer.service';
import { Streamer } from 'src/core/entities/streamer.entity';
import { StreamerStats } from 'src/core/entities/streamer-stats.entity';
import { StreamerRepository } from 'src/core/repositories/streamer.repository';
import { StreamerStatsRepository } from 'src/core/repositories/streamer-stats.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Streamer, StreamerStats])],
  controllers: [StreamerController],
  providers: [StreamerRepository, StreamerStatsRepository, StreamerService],
})
export class StreamerModule {}
