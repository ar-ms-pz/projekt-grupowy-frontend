import { ErrorResponse } from '../models/response';

export const fetchErrorResponse = (message: string): ErrorResponse => {
    return {
        errors: [
            {
                message,
                code: 'fetch_error',
                path: [],
            },
        ],
    };
};

export const unknownErrorResponse: ErrorResponse = {
    errors: [
        {
            message: 'Unknown error',
            code: '500',
            path: [],
        },
    ],
};
