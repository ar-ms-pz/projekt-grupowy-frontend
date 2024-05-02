import { useMutation } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../callApi';
import { User } from '../models/user';

interface Variables {
    username: string;
    password: string;
}

export const useSignUp = () => {
    return useMutation<Response<User>, Error, Variables>({
        mutationFn: async ({ username, password }) => {
            const response = await callApi(Endpoints.REGISTER, {
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
