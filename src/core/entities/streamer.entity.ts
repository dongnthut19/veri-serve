import { BaseEntity, Column, Entity, Index, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StreamerStats } from './streamer-stats.entity';

@Entity({ name: 'streamer' })
export class Streamer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'channel_name', unique: true })
  @Index()
  channelName: string;

  @Column({ name: 'partnered', default: false })
  partnered: boolean;

  @Column({ name: 'mature', default: false })
  mature: boolean;

  @Column({ name: 'language' })
  language: string;

  @OneToOne(() => StreamerStats, (streamerStats) => streamerStats.streamer, { cascade: true })
  stats: StreamerStats;
}
