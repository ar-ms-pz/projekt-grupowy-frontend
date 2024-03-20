import { usePosts } from '../../api/posts/use-posts';
import { getImageUrl } from '../../utils/getImageUrl';
import { Post } from '../post/post';

interface Props {
    userId?: number;
}

export const PostList = ({ userId }: Props) => {
    const { data: response } = usePosts({
        offset: 0,
        userId,
    });

    if (response.errors) {
        return (
            <div>
                {response.errors.map((error) => (
                    <p key={error.code}>{error.message}</p>
                ))}
            </div>
        );
    }

    return (
        <ul>
            {response.data.map(
                ({
                    image,
                    description,
                    id,
                    createdAt,
                    isLiked,
                    likes,
                    author,
                }) => (
                    <li key={id}>
                        <Post
                            id={id}
                            imageSrc={getImageUrl(image)}
                            description={description}
                            likes={likes}
                            isLiked={isLiked}
                            authorName={author.name}
                            authorId={author.id}
                            createdAt={createdAt}
                        />
                    </li>
                ),
            )}
        </ul>
    );
};
