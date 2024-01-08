import * as winston from 'winston';
import { ClsServiceManager } from 'nestjs-cls';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

function formatParams(info: any) {
  const { timestamp, level, message, context, ...args } = info;
  const traceId =
    ClsServiceManager.getClsService()?.get('traceId') || process.pid;
  return `${timestamp} ${level} [${context}] [${traceId}] ${message}`;
}

const logFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.ms' }),
  winston.format.printf(formatParams),
);

export const WINSTON_CONFIG = {
  transports: [
    new winston.transports.Console({
      format: logFormat,
    }),
    // other transports...
  ],
  // other options
};

export { WINSTON_MODULE_NEST_PROVIDER };
