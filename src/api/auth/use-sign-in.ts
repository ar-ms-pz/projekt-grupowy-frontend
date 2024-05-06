import { useMutation } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../call-api';
import { User } from '../models/user';
import { FetchError } from '../fetch-error';

interface Variables {
    username: string;
    password: string;
}

export const useSignIn = () => {
    return useMutation<Response<User>, FetchError, Variables>({
        mutationFn: async ({ username, password }) => {
            return callApi(Endpoints.LOGIN, {
                method: 'POST',
                body: {
                    username,
                    password,
                },
            });
        },
    });
};
