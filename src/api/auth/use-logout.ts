import { useMutation } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../helpers/endpoints';
import { callApi } from '../helpers/call-api';
import { FetchError } from '../helpers/fetch-error';

export const useLogout = () => {
    return useMutation<Response<null>, FetchError>({
        mutationFn: async () => {
            return callApi(Endpoints.LOGOUT, {
                method: 'POST',
            });
        },
    });
};
