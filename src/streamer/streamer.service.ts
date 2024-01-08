import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ApiResponse } from 'src/common/api.response';
import { StreamerDto } from 'src/core/dtos/streamer.dto';
import { StreamerStatsRepository } from 'src/core/repositories/streamer-stats.repository';
import { StreamerRepository } from 'src/core/repositories/streamer.repository';

@Injectable()
export class StreamerService {
  logger = new Logger(StreamerService.name);

  constructor(
    private readonly streamerRepository: StreamerRepository,
    private readonly statsRepository: StreamerStatsRepository,
  ) {}

  async getTopOfStreamer(limit: number): Promise<ApiResponse> {
    try {
      // const topStreamers = await this.statsRepository
      //   .createQueryBuilder('stats')
      //   .select(['stats.ChannelID', 'MAX(stats.WatchTimeMinutes) as maxWatchTime'])
      //   .groupBy('stats.ChannelID')
      //   .orderBy('maxWatchTime', 'DESC')
      //   .limit(limit)
      //   .getRawMany();

      const conditions = { watchTimeMinutes: 1 };
      // const selectedColumns = ['id', 'name', 'createdAt'];
      const joinTables = [
        { table: 'streamer-stats.streamer', joinTable: 'streamer' },
      ];
      const orderBy: any = { column: 'watchTimeMinutes', order: 'DESC' };

      const streamers = await this.statsRepository.findByCondition(conditions, joinTables, null, orderBy, limit);
      return ApiResponse.success();
    } catch (error) {
      this.logger.error(`getTopOfStreamer get error: ${JSON.stringify(error.stack)}`);
      throw new InternalServerErrorException({
        message: `getTopOfStreamer get error`,
      });
    }
  }
}
