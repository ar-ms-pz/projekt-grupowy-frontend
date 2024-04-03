import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '../query-keys';
import { DEFAULT_LIMIT } from '../../config';
import { Endpoints } from '../endpoints';
import { PaginatedResponse } from '../models/response';
import { Post } from '../models/post';
import { callApi } from '../callApi';
import {
    fetchErrorResponse,
    unknownErrorResponse,
} from '../erorrs/error-responses';

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
    return useSuspenseQuery<PaginatedResponse<Post>>({
        queryKey: [QueryKeys.POSTS, offset, limit, userId],
        queryFn: async ({ signal }) => {
            try {
                const response = await callApi(Endpoints.POSTS, {
                    signal,
                    query: {
                        offset: offset.toString(),
                        limit: limit.toString(),
                        userId: userId?.toString(),
                    },
                });

                return response.json();
            } catch (error) {
                if (error instanceof Error) {
                    return fetchErrorResponse(error.message);
                }

                return unknownErrorResponse;
            }
        },
    });
};
