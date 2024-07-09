import { SuccessResponse, PaginatedResponse,  ErrorResponse, ErrorDetail } from "../@types/api.response.type";
import HttpCode from "./http.code";

export const createSuccessResponse  = <T>(data: T, code: HttpCode.OK | HttpCode.CREATED | HttpCode.NO_CONTENT, message?: string): SuccessResponse<T> => {
    return {
        status: 'success',
        code,
        data,
        message,
    };
}

export const createPaginatedResponse = <T>(data: T[], page: number, limit: number, total: number): PaginatedResponse<T> => {
    return {
        status: 'success',
        code: HttpCode.OK,
        data,
        page,
        limit,
        total,
    };
}

export const createErrorResponse = (code: HttpCode.BAD_REQUEST | HttpCode.UNAUTHORIZED | HttpCode.FORBIDDEN | HttpCode.NOT_FOUND | HttpCode.CONFLICT | HttpCode.INTERNAL_SERVER_ERROR, message: string, details?: any): ErrorResponse => {
    const errorDetail: ErrorDetail = {
        message,
        details,
    };

    return {
        status: 'error',
        code,
        error: errorDetail,
    };
}

