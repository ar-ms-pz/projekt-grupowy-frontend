import { useMutation } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../callApi';
import { User } from '../models/user';

interface Variables {
    username: string;
    password: string;
}

export const useSignIn = () => {
    return useMutation<Response<User>, Error, Variables>({
        mutationFn: async ({ username, password }) => {
            const response = await callApi(Endpoints.LOGIN, {
                method: 'POST',
                body: {
                    username,
                    password,
                },
            });

            return response.json();
        },
    });
};
