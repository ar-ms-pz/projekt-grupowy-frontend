import { ApiError } from '../models/response';

export class FetchError extends Error {
    public isNotFound: boolean;
    constructor(
        message: string,
        public status: number,
        public errors: ApiError[],
    ) {
        super(message);
        this.isNotFound = status === 404;
    }
}
