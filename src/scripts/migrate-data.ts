import { createConnection } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'csv-parser';
import * as dotenv from 'dotenv';
import { Streamer } from '../core/entities/streamer.entity';
import { StreamerStats } from '../core/entities/streamer-stats.entity';

dotenv.config({ path: path.resolve(__dirname, '../../.dev.env') });

async function migrateData() {
  const streamerData = [];
  const streamerStatsData = [];
  // ... Read data from CSV file and process data
  fs.createReadStream(path.resolve(__dirname, './data-sample/twitchdata.csv'))
    .pipe(csv())
    .on('data', (row) => {
      const streamerEntity = new Streamer();
      streamerEntity.channelName = row['Channel'];
      streamerEntity.mature = row['Mature'];
      streamerEntity.partnered = row['Partnered'];
      streamerEntity.language = row['Language'];

      const streamerStatsEntity = new StreamerStats();
      streamerStatsEntity.watchTimeMinutes = parseInt(row['Watch time(Minutes)']);
      streamerStatsEntity.followers = parseInt(row['Followers']);
      streamerStatsEntity.followersGained = parseInt(row['Views gained']);
      streamerStatsEntity.peakViewers = parseInt(row['Peak viewers']);
      streamerStatsEntity.streamTimeMinutes = parseInt(row['Stream time(minutes)']);
      streamerStatsEntity.viewsGained = parseInt(row['Views gained']);
      streamerStatsEntity.averageViewers = parseInt(row['Average viewers']);

      streamerEntity.stats = streamerStatsEntity;
      streamerStatsEntity.streamer = streamerEntity;

      streamerData.push(streamerEntity);
      streamerStatsData.push(streamerStatsEntity);
    })
    .on('end', async () => {
      await saveData(streamerData, streamerStatsData);
    });
}

async function saveData(streamerData, streamerStatsData) {
  // Create a connection to the database
  const connection = await createConnection({
    ssl: true,
    type: 'postgres',
    entities: [Streamer, StreamerStats],
    synchronize: true,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  try {
    // ... Perform data migration into the database
    const streamerRepository = connection.getRepository(Streamer);
    const streamerStatsRepository = connection.getRepository(StreamerStats);

    await streamerRepository.save(streamerData);
    await streamerStatsRepository.save(streamerStatsData);

    console.log('Data Migration Successful!');
  } catch (error) {
    console.error('Error during migration:', error);
  } finally {
    await connection.close();
  }
}

migrateData();
