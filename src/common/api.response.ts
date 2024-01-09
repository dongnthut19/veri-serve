import { ClsServiceManager } from 'nestjs-cls';
import { randomString } from 'src/util/string.util';

export class CommonApiResponse {
  code: number | string;
  message: string;
  data: any;
  traceId: string;

  constructor(code: number | string, message: string, data: any, traceId: string) {
    this.code = code || 0;
    this.message = message || 'success';
    this.data = data || null;
    this.traceId = traceId || '';
  }

  static success(data?: any | 'Success'): CommonApiResponse {
    return new CommonApiResponse(0, 'success', data, currentTraceId());
  }

  static successMessage(message?: string | 'success'): CommonApiResponse {
    return new CommonApiResponse(0, message, null, currentTraceId());
  }

  static error(message?: string | 'error'): CommonApiResponse {
    return new CommonApiResponse(500, message, null, currentTraceId());
  }
}

export function currentTraceId(): string {
  return ClsServiceManager.getClsService()?.get('traceId') || randomString();
}
