import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '../query-keys';
import { PaginatedResponse } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../call-api';
import { User } from '../models/user';
import { FetchError } from '../fetch-error';
import { useSearch } from '@tanstack/react-router';
import { DEFAULT_LIMIT } from '@/config';

export const useUsers = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const params: Record<string, any> = useSearch({
        from: '/admin',
    });

    const paramsPage = (params as { page: unknown }).page;

    const page =
        !isNaN(Number(paramsPage)) &&
        Number(paramsPage) > 0 &&
        Number(paramsPage) % 1 === 0
            ? Number(paramsPage)
            : 1;

    const name =
        params.search && params.search.length > 2 ? params.search : undefined;

    return useSuspenseQuery<PaginatedResponse<User>, FetchError>({
        queryKey: [QueryKeys.USERS, name],
        queryFn: async ({ signal }) => {
            return callApi(Endpoints.USERS, {
                signal,
                query: {
                    offset: DEFAULT_LIMIT * (page - 1),
                    limit: DEFAULT_LIMIT,
                    name: name,
                },
            });
        },
    });
};
