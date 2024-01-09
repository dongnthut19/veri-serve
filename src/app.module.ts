import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracingModule } from './tracing/tracing.module';
import { StreamerModule } from './streamer/streamer.module';
import { HttpExceptionFilter } from './common/http-exception.filter';

@Module({
  imports: [
    TracingModule,
    TypeOrmModule.forRoot({
      ssl: true,
      type: 'postgres',
      entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      synchronize: true,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    }),
    StreamerModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
