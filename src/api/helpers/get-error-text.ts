import { ErrorCode, ErrorCodes } from '../error-codes';

export const getErrorText = (code: ErrorCode) => {
    switch (code) {
        case ErrorCodes.INVALID_CREDENTIALS:
            return 'Invalid username or password';
        case ErrorCodes.USERNAME_TAKEN:
            return 'Username is already taken';
        case ErrorCodes.UNAUTHORIZED:
            return 'You are not authorized to perform this action';
        case ErrorCodes.INVALID_FILE_TYPE:
            return 'Invalid file type. Provide a file of valid type';
        case ErrorCodes.MISSING_FILE:
            return 'No file was provided. Make sure to provide a file';
        case ErrorCodes.NOT_FOUND:
            return 'Resource was not found';
        case ErrorCodes.INTERNAL_SERVER_ERROR:
        default:
            return 'Unknown error has occurred. Please try again later.';
    }
};
