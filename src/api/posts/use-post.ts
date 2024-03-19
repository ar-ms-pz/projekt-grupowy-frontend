import { useSuspenseQuery } from '@tanstack/react-query';
import { QueryKeys } from '../query-keys';
import { Response } from '../models/response';
import { Post } from '../models/post';
import { API_URL } from '../../config';
import { Endpoints } from '../endpoints';

interface Params {
    id: number;
}

export const usePosts = ({ id }: Params) => {
    return useSuspenseQuery<Response<Post>>({
        queryKey: [QueryKeys.POSTS, id],
        queryFn: async () => {
            const endpoint = Endpoints.POSTS.replace('{{id}}', id.toString());

            const url = new URL(`${API_URL}${endpoint}`);

            const response = await fetch(url);

            return response.json();
        },
    });
};
