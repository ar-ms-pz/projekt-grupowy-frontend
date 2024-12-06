import { useMutation } from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../helpers/endpoints';
import { callApi } from '../helpers/call-api';
import { FetchError } from '../helpers/fetch-error';

export const useExtendSession = () => {
    return useMutation<Response<null>, FetchError>({
        mutationFn: async () => {
            return callApi(Endpoints.EXTEND_SESSION, {
                method: 'POST',
            });
        },
    });
};
