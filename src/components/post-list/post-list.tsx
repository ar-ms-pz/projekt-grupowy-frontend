import { Link } from '@tanstack/react-router';
import { usePosts } from '../../api/posts/use-posts';
import { getImageUrl } from '../../utils/getImageUrl';

export const PostList = () => {
    const { data: posts, isError } = usePosts({
        offset: 0,
    });

    if (isError) {
        return <div>Error loading posts</div>;
    }

    return (
        <ul>
            {posts.data.map((post) => (
                <li key={post.id}>
                    <img
                        src={getImageUrl(post.image)}
                        alt={post.description ?? 'Post image'}
                    />
                    <h3>{post.description}</h3>
                    <p>
                        <Link
                            to={`/posts/$postId`}
                            params={{
                                postId: post.id.toString(),
                            }}
                        >
                            View
                        </Link>
                    </p>
                </li>
            ))}
        </ul>
    );
};
