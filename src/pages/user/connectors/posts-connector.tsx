import { usePosts } from '../../../api/posts/use-posts';
import { PostList } from '../../../components/post-list/post-list';
import { DEFAULT_LIMIT } from '../../../config';

type Props = {
    userId: number;
};

export const UserPostsConnector = ({ userId }: Props) => {
    const { data } = usePosts({
        limit: DEFAULT_LIMIT,
        userId,
    });

    if (data.errors) {
        return (
            <div>
                {data.errors.map((error) => (
                    <p key={error.code}>{error.message}</p>
                ))}
            </div>
        );
    }

    return <PostList posts={data.data} />;
};
