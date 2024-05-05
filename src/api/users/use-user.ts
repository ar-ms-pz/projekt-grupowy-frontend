import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '../query-keys';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../call-api';
import { User } from '../models/user';
import { FetchError } from '../fetch-error';

interface Params {
    userId: number;
}

export const useUser = ({ userId }: Params) => {
    return useSuspenseQuery<Response<User>, FetchError>({
        queryKey: [QueryKeys.USERS, userId],
        queryFn: async ({ signal }) => {
            return callApi(Endpoints.USER, {
                params: { id: userId.toString() },
                signal,
            });
        },
    });
};
