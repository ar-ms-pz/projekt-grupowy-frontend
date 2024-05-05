import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '../query-keys';
import { DEFAULT_LIMIT } from '../../config';
import { Endpoints } from '../endpoints';
import { PaginatedResponse } from '../models/response';
import { Post } from '../models/post';
import { callApi } from '../call-api';
import { FetchError } from '../fetch-error';

interface Params {
    offset?: number;
    limit?: number;
    userId?: number;
}

export const usePosts = ({
    offset = 0,
    limit = DEFAULT_LIMIT,
    userId,
}: Params) => {
    return useSuspenseQuery<PaginatedResponse<Post>, FetchError>({
        queryKey: [QueryKeys.POSTS, offset, limit, userId],
        queryFn: async ({ signal }) => {
            return callApi(Endpoints.POSTS, {
                signal,
                query: {
                    offset: offset.toString(),
                    limit: limit.toString(),
                    userId: userId?.toString(),
                },
            });
        },
    });
};
