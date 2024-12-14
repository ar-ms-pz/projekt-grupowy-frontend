import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Response } from '../../models/response';
import { callApi } from '../../helpers/call-api';
import { Endpoints } from '../../helpers/endpoints';
import { QueryKeys } from '../../helpers/query-keys';
import { Post } from '../../models/post';
import { FetchError } from '../../helpers/fetch-error';
import { Favorite } from '../../models/favorite';
import { ErrorCodes } from '../../helpers/error-codes';
import { getErrorText } from '../../helpers/get-error-text';
import { useToast } from '@/hooks/use-toast';

interface Params {
    id: number;
}

interface Variables {
    favorite: boolean;
}

export const useSetFavorite = ({ id }: Params) => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

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

            // Add or remove post from favorites
            queryClient.invalidateQueries({ queryKey: [QueryKeys.FAVORITES] });

            const title = variables.favorite
                ? 'Post added to favorites'
                : 'Post removed from favorites';

            const description = variables.favorite
                ? 'The post has been added to favorites'
                : 'The post has been removed from favorites';

            toast({
                title,
                description,
            });
        },
        onError: (error, variables) => {
            const title = variables.favorite
                ? 'Could not add post to favorites'
                : 'Could not remove post from favorites';

            const errorCode =
                error.errors[0]?.code ?? ErrorCodes.INTERNAL_SERVER_ERROR;

            toast({
                title,
                description: getErrorText(errorCode),
                variant: 'destructive',
            });
        },
    });
};
