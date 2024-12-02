import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../call-api';
import { User } from '../models/user';
import { FetchError } from '../fetch-error';
import { QueryKeys } from '../query-keys';

interface Variables {
    username: string;
    password: string;
    type: 'ADMIN' | 'USER';
}

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation<Response<User>, FetchError, Variables>({
        mutationFn: async ({ username, password, type }) => {
            return callApi(Endpoints.USERS, {
                method: 'POST',
                body: {
                    name: username,
                    password,
                    type,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.USERS],
            });
        },
    });
};
