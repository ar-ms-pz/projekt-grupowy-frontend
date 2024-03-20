interface ApiError {
    message: string;
    code: string;
    path: string[];
}

export interface ErrorResponse {
    errors: ApiError[];
    data: never;
}

interface SuccessResponse<T> {
    data: T;
    errors: never;
}

interface PaginatedSuccessResponse<T> {
    data: T[];
    info: {
        limit: number;
        offset: number;
        total: number;
    };
    errors: never;
}

export type Response<T> = ErrorResponse | SuccessResponse<T>;

export type PaginatedResponse<T> = ErrorResponse | PaginatedSuccessResponse<T>;
