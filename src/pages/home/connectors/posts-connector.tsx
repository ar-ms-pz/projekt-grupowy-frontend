import { useMemo } from 'react';
import { usePosts } from '../../../api/posts/use-posts';
import { DEFAULT_LIMIT } from '../../../config';
import { PostList } from '../../../components/post-list/post-list';

export const PostsConnector = () => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePosts({
        limit: DEFAULT_LIMIT,
    });

    const posts = useMemo(
        () => data.pages.flatMap((page) => page.data),
        [data],
    );

    return (
        <PostList
            posts={posts}
            fetchNextPage={() => hasNextPage && fetchNextPage()}
            isFetchingNextPage={isFetchingNextPage}
        />
    );
};
