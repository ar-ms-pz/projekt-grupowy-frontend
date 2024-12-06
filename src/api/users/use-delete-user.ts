import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../call-api';
import { User } from '../models/user';
import { FetchError } from '../fetch-error';
import { QueryKeys } from '../query-keys';
import { getErrorText } from '@/api/helpers/get-error-text';
import { useToast } from '@/hooks/use-toast';

interface Variables {
    userId: number;
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

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

            toast({
                title: 'User deleted',
                description: 'The user has been deleted successfully',
            });
        },

        onError: (error) => {
            const errorCode =
                error.errors?.[0]?.code ?? 'INTERNAL_SERVER_ERROR';

            toast({
                title: 'Could not delete user',
                description: getErrorText(errorCode),
                variant: 'destructive',
            });
        },
    });
};
