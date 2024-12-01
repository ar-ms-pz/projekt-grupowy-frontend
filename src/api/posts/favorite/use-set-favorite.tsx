import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Response } from '../../models/response';
import { callApi } from '../../call-api';
import { Endpoints } from '../../endpoints';
import { QueryKeys } from '../../query-keys';
import { Post } from '../../models/post';
import { toast } from 'react-toastify';
import { FetchError } from '../../fetch-error';
import { Favorite } from '../../models/favorite';
import { ErrorCodes } from '../../error-codes';
import { Toast } from '../../../components/toast/toast';
import { getErrorText } from '../../../helpers/get-error-text';

interface Params {
    id: number;
}

interface Variables {
    favorite: boolean;
}

export const useSetFavorite = ({ id }: Params) => {
    const queryClient = useQueryClient();

    return useMutation<Response<Favorite>, FetchError, Variables>({
        mutationFn: async ({ favorite }) => {
            return callApi(Endpoints.SET_FAVORITE, {
                method: 'POST',
                body: { favorite },
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
                            isFavorite: variables.favorite,
                            favorites:
                                oldData.data.favorites +
                                (variables.favorite ? 1 : -1),
                        },
                    };
                },
            );

            queryClient.setQueriesData<Response<Post[]>>(
                { queryKey: [QueryKeys.POSTS] },
                (oldData) => {
                    if (!oldData) return oldData;

                    const newPosts = oldData.data.map((post) => {
                        if (post.id !== id) return post;

                        return {
                            ...post,
                            isFavorite: variables.favorite,
                            favorites:
                                post.favorites + (variables.favorite ? 1 : -1),
                        };
                    });

                    return {
                        ...oldData,
                        data: newPosts,
                    };
                },
            );
        },
        onError: (error, variables) => {
            const title = variables.favorite
                ? 'Could not add post to favorites'
                : 'Could not remove post from favorites';

            const errorCode =
                error.errors[0]?.code ?? ErrorCodes.INTERNAL_SERVER_ERROR;

            toast.error(
                <Toast title={title} message={getErrorText(errorCode)} />,
            );
        },
    });
};
