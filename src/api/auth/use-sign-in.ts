import { useMutation } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../helpers/endpoints';
import { callApi } from '../helpers/call-api';
import { User } from '../models/user';
import { FetchError } from '../helpers/fetch-error';

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
