import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '../query-keys';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../call-api';
import { User } from '../models/user';
import { FetchError } from '../fetch-error';

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
