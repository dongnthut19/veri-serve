import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from './base.repository';
import { Streamer } from '../entities/streamer.entity';

@Injectable()
export class StreamerRepository extends BaseRepository<Streamer> {
  constructor(@InjectRepository(Streamer) streamRepository: Repository<Streamer>) {
    super(streamRepository);
  }
}
