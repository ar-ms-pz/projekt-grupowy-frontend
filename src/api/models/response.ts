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
}
