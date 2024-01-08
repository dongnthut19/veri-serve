import { ClsServiceManager } from 'nestjs-cls';
import { randomString } from 'src/util/string.util';

export class ApiResponse {
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

  static success(data?: any | 'Success'): ApiResponse {
    return new ApiResponse(0, 'success', data, currentTraceId());
  }

  static successMessage(message?: string | 'success'): ApiResponse {
    return new ApiResponse(0, message, null, currentTraceId());
  }

  static error(message?: string | 'error'): ApiResponse {
    return new ApiResponse(500, message, null, currentTraceId());
  }
}

export function currentTraceId(): string {
  return ClsServiceManager.getClsService()?.get('traceId') || randomString();
}
