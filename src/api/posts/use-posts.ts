import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '../query-keys';
import { API_URL, DEFAULT_LIMIT } from '../../config';
import { Endpoints } from '../endpoints';
import { PaginatedResponse } from '../models/response';
import { Post } from '../models/post';

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
        queryFn: async () => {
            const url = new URL(`${API_URL}${Endpoints.POSTS}`);

            url.searchParams.append('offset', offset.toString());
            url.searchParams.append('limit', limit.toString());

            userId && url.searchParams.append('userId', userId.toString());

            const response = await fetch(url);

            return response.json();
        },
    });
};
