import { usePosts } from '../../../api/posts/use-posts';
import { PostList } from '../../../components/post-list/post-list';
import { DEFAULT_LIMIT } from '../../../config';

export const PostsConnector = () => {
    const { data } = usePosts({
        limit: DEFAULT_LIMIT,
    });

    return <PostList posts={data.data} />;
};
