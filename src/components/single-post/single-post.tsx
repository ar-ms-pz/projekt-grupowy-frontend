import { usePost } from '../../api/posts/use-post';
import { getImageUrl } from '../../utils/getImageUrl';
import { Post } from '../post/post';

interface Props {
    id: number;
}

export const SinglePost = ({ id }: Props) => {
    const { data: response } = usePost({
        id,
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

    const {
        image,
        description,
        id: postId,
        createdAt,
        isLiked,
        likes,
        author,
    } = response.data;

    return (
        <Post
            id={postId}
            imageSrc={getImageUrl(image)}
            description={description}
            likes={likes}
            isLiked={isLiked}
            authorName={author.name}
            authorId={author.id}
            createdAt={createdAt}
        />
    );
};
