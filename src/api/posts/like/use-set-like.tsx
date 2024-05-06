import {
    useMutation,
    useQueryClient,
    InfiniteData,
} from '@tanstack/react-query';
import { Response } from '../../models/response';
import { callApi } from '../../call-api';
import { Endpoints } from '../../endpoints';
import { QueryKeys } from '../../query-keys';
import { Post } from '../../models/post';
import { toast } from 'react-toastify';
import { FetchError } from '../../fetch-error';
import { Like } from '../../models/like';
import { ErrorCodes } from '../../error-codes';
import { Toast } from '../../../components/toast/toast';
import { getErrorText } from '../../../helpers/get-error-text';

interface Params {
    id: number;
}

interface Variables {
    like: boolean;
}

export const useSetLike = ({ id }: Params) => {
    const queryClient = useQueryClient();

    return useMutation<Response<Like>, FetchError, Variables>({
        mutationFn: async ({ like }) => {
            return callApi(Endpoints.SET_LIKE, {
                method: 'POST',
                body: { like },
                params: { id: `${id}` },
            });
        },
        onSuccess: (_, variables) => {
            queryClient.setQueryData<Response<Post>>(
                [QueryKeys.POST, id],
                (oldData) => {
                    if (!oldData) return oldData;

                    return {
                        ...oldData,
                        data: {
                            ...oldData.data,
                            isLiked: variables.like,
                            likes:
                                oldData.data.likes + (variables.like ? 1 : -1),
                        },
                    };
                },
            );

            queryClient.setQueriesData<InfiniteData<Response<Post[]>>>(
                { queryKey: [QueryKeys.POSTS] },
                (oldData) => {
                    if (!oldData) return oldData;

                    const newPages = oldData.pages.map((page) => {
                        const newPosts = page.data.map((post) => {
                            if (post.id !== id) return post;

                            return {
                                ...post,
                                isLiked: variables.like,
                                likes: post.likes + (variables.like ? 1 : -1),
                            };
                        });

                        return {
                            ...page,
                            data: newPosts,
                        };
                    });

                    return {
                        ...oldData,
                        pages: newPages,
                    };
                },
            );
        },
        onError: (error, variables) => {
            const title = variables.like
                ? 'Could not like post'
                : 'Could not remove like';

            const errorCode =
                error.errors[0]?.code ?? ErrorCodes.INTERNAL_SERVER_ERROR;

            toast.error(
                <Toast title={title} message={getErrorText(errorCode)} />,
            );
        },
    });
};
