import { useMutation } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../call-api';

export const useLogout = () => {
    return useMutation<Response<null>, Error>({
        mutationFn: async () => {
            return callApi(Endpoints.LOGOUT, {
                method: 'POST',
            });
        },
    });
};
