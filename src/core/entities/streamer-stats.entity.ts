import { BaseEntity, Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Streamer } from './streamer.entity';

@Entity({ name: 'streamer-stats' })
export class StreamerStats extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'channel_id', unique: true })
  @Index()
  channelId: string;

  @OneToOne(() => Streamer, (streamer) => streamer.stats)
  @JoinColumn()
  streamer: Streamer;

  @Column({ name: 'watch_time_minutes', type: 'bigint' })
  watchTimeMinutes: number;

  @Column({ name: 'stream_time_minutes', type: 'bigint' })
  streamTimeMinutes: number;

  @Column({ name: 'peak_viewers', type: 'bigint' })
  peakViewers: number;

  @Column({ name: 'average_viewers', type: 'bigint' })
  averageViewers: number;

  @Column({ name: 'followers', type: 'bigint' })
  followers: number;

  @Column({ name: 'followers_gained', type: 'bigint' })
  followersGained: number;

  @Column({ name: 'views_gained', type: 'bigint' })
  viewsGained: number;
}
