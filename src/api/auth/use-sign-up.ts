import { useMutation } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../call-api';
import { User } from '../models/user';

interface Variables {
    username: string;
    password: string;
}

export const useSignUp = () => {
    return useMutation<Response<User>, Error, Variables>({
        mutationFn: async ({ username, password }) => {
            return callApi(Endpoints.REGISTER, {
                method: 'POST',
                body: {
                    username,
                    password,
                },
            });
        },
    });
};
