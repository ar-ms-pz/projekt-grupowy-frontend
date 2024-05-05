import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '../query-keys';
import { Response } from '../models/response';
import { Post } from '../models/post';
import { Endpoints } from '../endpoints';

import { callApi } from '../call-api';
import { FetchError } from '../fetch-error';

interface Params {
    id: number;
}

export const usePost = ({ id }: Params) => {
    return useSuspenseQuery<Response<Post>, FetchError>({
        queryKey: [QueryKeys.POST, id],
        queryFn: async ({ signal }) => {
            return callApi(Endpoints.POST, {
                params: { id: id.toString() },
                signal,
            });
        },
    });
};
