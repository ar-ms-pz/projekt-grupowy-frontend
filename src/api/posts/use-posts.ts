import {
    InfiniteData,
    QueryKey,
    useSuspenseInfiniteQuery,
} from '@tanstack/react-query';
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
    return useSuspenseInfiniteQuery<
        PaginatedResponse<Post>,
        FetchError,
        InfiniteData<PaginatedResponse<Post>>,
        QueryKey,
        number
    >({
        queryKey: [QueryKeys.POSTS, userId, offset, limit],
        queryFn: async ({ signal, pageParam }) => {
            return callApi(Endpoints.POSTS, {
                signal,
                query: {
                    offset: pageParam.toString(),
                    limit: limit.toString(),
                    userId: userId?.toString(),
                },
            });
        },
        getNextPageParam: (lastPage) => {
            const newParam = lastPage.info.offset + lastPage.info.limit;
            if (lastPage.info.total <= newParam) return null;

            return lastPage.info.offset + lastPage.info.limit;
        },
        initialPageParam: offset,
    });
};
