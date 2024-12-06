import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '../helpers/query-keys';
import { Response } from '../models/response';
import { Endpoints } from '../helpers/endpoints';
import { callApi } from '../helpers/call-api';
import { User } from '../models/user';
import { FetchError } from '../helpers/fetch-error';

export const useCurrentUser = () => {
    return useSuspenseQuery<Response<User | null>, FetchError>({
        queryKey: [QueryKeys.WHO_AM_I],
        queryFn: async ({ signal }) => {
            try {
                return await callApi(Endpoints.WHO_AM_I, {
                    signal,
                });
            } catch (error) {
                return { data: null };
            }
        },
        retry: (failureCount, error) => {
            if (error instanceof FetchError && error.status === 401) {
                return false;
            }

            return failureCount < 4;
        },
    });
};
