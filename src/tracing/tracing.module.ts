import { Module } from '@nestjs/common';
import { ClsModule } from 'nestjs-cls';
import { WinstonModule } from 'nest-winston';
import { randomString } from '../util/string.util';
import { WINSTON_CONFIG } from './winston.config';

@Module({
  imports: [
    ClsModule.forRoot({
      middleware: {
        mount: true,
        setup: (cls /*, req*/) => {
          cls.set('traceId', randomString());
        },
      },
      global: true,
    }),
    WinstonModule.forRoot(WINSTON_CONFIG),
  ],
})
export class TracingModule {}
