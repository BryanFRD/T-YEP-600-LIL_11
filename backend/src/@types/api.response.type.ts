import HttpCode from '../utils/http.code';

interface ApiResponse<T> {
  status: 'success' | 'error';
  code: HttpCode;
  content?: T;
  message?: string;
  error?: ErrorDetail;
}

interface ErrorDetail {
  message: string;
  details?: any;
}

interface PaginatedResponse<T> {
  status: 'success' | 'error';
  code: HttpCode;
  content: T[];
  page: number;
  limit: number;
  total: number;
}

interface SuccessResponse<T> extends ApiResponse<T> {
  status: 'success';
  code: HttpCode.OK | HttpCode.CREATED | HttpCode.NO_CONTENT;
  content: T;
}

interface ErrorResponse extends ApiResponse<null> {
  status: 'error';
  code:
    | HttpCode.BAD_REQUEST
    | HttpCode.UNAUTHORIZED
    | HttpCode.FORBIDDEN
    | HttpCode.NOT_FOUND
    | HttpCode.CONFLICT
    | HttpCode.INTERNAL_SERVER_ERROR;
  error: ErrorDetail;
}

export {
  ApiResponse,
  ErrorDetail,
  PaginatedResponse,
  SuccessResponse,
  ErrorResponse,
};
