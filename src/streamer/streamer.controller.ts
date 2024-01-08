import { Controller, Get, Query } from '@nestjs/common';
// import { ApiResponse } from 'src/common/api.response';
import { StreamerService } from './streamer.service';
import { ApiResponse } from 'src/common/api.response';

@Controller('streamer')
export class StreamerController {
  constructor(private readonly streamerService: StreamerService) {}

  @Get()
  getTopOfStreamer(@Query('limit') limit: number): Promise<ApiResponse> {
    return this.streamerService.getTopOfStreamer(limit);
  }
}
