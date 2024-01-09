import { Controller, Get, Query } from '@nestjs/common';
import { StreamerService } from './streamer.service';
import { CommonApiResponse } from 'src/common/api.response';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('streamer')
@Controller('streamer')
export class StreamerController {
  constructor(private readonly streamerService: StreamerService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Receive top of streamer has been successfully.', type: CommonApiResponse })
  getTopOfStreamer(@Query('limit') limit: number): Promise<CommonApiResponse> {
    return this.streamerService.getTopOfStreamer(limit);
  }
}
