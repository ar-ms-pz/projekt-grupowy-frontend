import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../call-api';
import { User } from '../models/user';
import { FetchError } from '../fetch-error';
import { QueryKeys } from '../query-keys';
import { ErrorCodes } from '../error-codes';
import { useToast } from '@/hooks/use-toast';
import { getErrorText } from '@/api/helpers/get-error-text';

interface Variables {
    username: string;
    password: string;
    type: 'ADMIN' | 'USER';
}

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

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

            toast({
                title: 'User created',
                description: 'The user has been created successfully',
            });
        },
        onError: (error) => {
            const errorCode =
                error.errors?.[0]?.code ?? ErrorCodes.INTERNAL_SERVER_ERROR;

            toast({
                title: 'Could not create user',
                description: getErrorText(errorCode),
                variant: 'destructive',
            });
        },
    });
};
