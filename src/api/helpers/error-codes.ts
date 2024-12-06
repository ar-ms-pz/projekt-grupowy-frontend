export const ErrorCodes = {
    INVALID_CREDENTIALS: 'invalid_credentials',
    USERNAME_TAKEN: 'username_taken',
    UNAUTHORIZED: 'unauthorized',
    INVALID_FILE_TYPE: 'invalid_file_type',
    MISSING_FILE: 'missing_file',
    INTERNAL_SERVER_ERROR: 'internal_server_error',
    NOT_FOUND: 'not_found',
    FETCH_ERROR: 'fetch_error',
} as const;

export type ErrorCode = (typeof ErrorCodes)[keyof typeof ErrorCodes];
