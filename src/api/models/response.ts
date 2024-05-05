import { ErrorCode } from '../error-codes';

export interface ApiError {
    message: string;
    code: ErrorCode;
    path: string[];
}

export interface Response<T> {
    data: T;
}

export interface PaginatedResponse<T> {
    data: T[];
    info: {
        limit: number;
        offset: number;
        total: number;
    };
    errors: never;
}
