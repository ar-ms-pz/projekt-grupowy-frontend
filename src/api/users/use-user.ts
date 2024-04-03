import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '../query-keys';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import {
    fetchErrorResponse,
    unknownErrorResponse,
} from '../erorrs/error-responses';
import { callApi } from '../callApi';
import { User } from '../models/user';

interface Params {
    userId: number;
}

export const useUser = ({ userId }: Params) => {
    return useSuspenseQuery<Response<User>>({
        queryKey: [QueryKeys.USERS, userId],
        queryFn: async ({ signal }) => {
            try {
                const response = await callApi(Endpoints.USER, {
                    params: { id: userId.toString() },
                    signal,
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
