import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CommonApiResponse } from 'src/common/api.response';
import { StreamerRepository } from 'src/core/repositories/streamer.repository';

@Injectable()
export class StreamerService {
  logger = new Logger(StreamerService.name);

  constructor(private readonly streamerRepository: StreamerRepository) {}

  /**
   * Retrieves the top streamers based on watch time minutes.
   *
   * @param limit - The maximum number of streamers to retrieve. Default is 10.
   * @returns A Promise containing ApiResponse with the top streamers.
   */
  async getTopOfStreamer(limit: number = 10): Promise<CommonApiResponse> {
    try {
      // Define the tables to join and the order by criteria
      const joinTables = [{ table: 'streamer.stats', joinTable: 'streamer-stats' }];
      const orderBy: any = { column: 'streamer-stats.watchTimeMinutes', order: 'DESC' };

      // Retrieve streamers based on the specified conditions
      const streamers = await this.streamerRepository.findByCondition(
        'streamer',
        null,
        joinTables,
        null,
        orderBy,
        limit,
      );
      this.logger.log(`streamers: ${JSON.stringify(streamers)}`);

      return CommonApiResponse.success(streamers);
    } catch (error) {
      this.logger.error(`getTopOfStreamer get error: ${JSON.stringify(error.stack)}`);
      throw new InternalServerErrorException({
        message: `getTopOfStreamer get error`,
      });
    }
  }
}
