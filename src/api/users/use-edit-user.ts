import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../call-api';
import { User } from '../models/user';
import { FetchError } from '../fetch-error';
import { QueryKeys } from '../query-keys';

interface Variables {
    userId: number;
    password?: string;
    type: 'ADMIN' | 'USER';
}

export const useEditUser = () => {
    const queryClient = useQueryClient();

    return useMutation<Response<User>, FetchError, Variables>({
        mutationFn: async ({ userId, password, type }) => {
            return callApi(Endpoints.USER, {
                method: 'PATCH',
                body: {
                    password: password || undefined,
                    type,
                },
                params: {
                    id: `${userId}`,
                },
            });
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.USERS],
            });
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.USER, variables.userId],
            });
        },
    });
};
