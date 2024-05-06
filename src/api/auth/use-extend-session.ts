import { useMutation } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../call-api';
import { FetchError } from '../fetch-error';

export const useExtendSession = () => {
    return useMutation<Response<null>, FetchError>({
        mutationFn: async () => {
            return callApi(Endpoints.EXTEND_SESSION, {
                method: 'POST',
            });
        },
    });
};
