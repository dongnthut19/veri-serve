import { IsNotEmpty } from 'class-validator';

export class StreamerDto {
  @IsNotEmpty()
  name: string;

  id: string;

  channelName: string;

  partnered: boolean;

  mature: boolean;

  language: string;

  watchTimeMinutes: number;

  streamTimeMinutes: number;

  peakViewers: number;

  averageViewers: number;

  followers: number;

  followersGained: number;

  viewsGained: number;
}
