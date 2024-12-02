import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../call-api';
import { User } from '../models/user';
import { FetchError } from '../fetch-error';
import { QueryKeys } from '../query-keys';

interface Variables {
    userId: number;
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation<Response<User>, FetchError, Variables>({
        mutationFn: async ({ userId }) => {
            return callApi(Endpoints.USER, {
                method: 'DELETE',
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
