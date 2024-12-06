import {
    InfiniteData,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import { Response } from '../models/response';
import { Endpoints } from '../endpoints';
import { callApi } from '../call-api';
import { Post } from '../models/post';
import { QueryKeys } from '../query-keys';
import { toast } from 'react-toastify';
import { Toast } from '../../components/toast/toast';
import { getErrorText } from '../helpers/get-error-text';
import { ErrorCodes } from '../error-codes';
import { FetchError } from '../fetch-error';

interface Params {
    id: number;
}

export const useDeletePost = ({ id }: Params) => {
    const queryClient = useQueryClient();

    return useMutation<Response<Post>, FetchError>({
        mutationFn: async () => {
            return callApi(Endpoints.POST, {
                method: 'DELETE',
                params: {
                    id: id.toString(),
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: [QueryKeys.POST, id],
            });

            queryClient.setQueriesData<InfiniteData<Response<Post[]>, number>>(
                { queryKey: [QueryKeys.POSTS] },
                (oldData) => {
                    if (!oldData) return oldData;

                    const newPages = oldData.pages.map((page) => {
                        const newPosts = page.data.filter(
                            (post) => post.id !== id,
                        );

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

            toast.success(
                <Toast
                    title="Post Deleted"
                    message="Post deleted successfully"
                />,
            );
        },
        onError: (error) => {
            const errorCode =
                error.errors[0]?.code ?? ErrorCodes.INTERNAL_SERVER_ERROR;

            toast.error(
                <Toast
                    title="Could not delete post"
                    message={getErrorText(errorCode)}
                />,
            );
        },
    });
};
