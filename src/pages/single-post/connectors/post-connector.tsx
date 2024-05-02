import { usePost } from '../../../api/posts/use-post';
import { Post } from '../../../components/post/post';
import { getImageUrl } from '../../../utils/getImageUrl';

type Props = {
    id: number;
};

export const SinglePostConnector = ({ id }: Props) => {
    const { data } = usePost({
        id,
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

    const { image, author, createdAt, description, isLiked } = data.data;

    return (
        <Post
            imageSrc={getImageUrl(image)}
            description={description}
            authorName={author.name}
            createdAt={createdAt}
            authorId={author.id}
            isLiked={isLiked}
        />
    );
};
