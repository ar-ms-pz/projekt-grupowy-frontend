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

    const { image, author, createdAt, description, isLiked } = data.data;

    return (
        <Post
            id={id}
            imageSrc={getImageUrl(image)}
            description={description}
            authorName={author.name}
            createdAt={createdAt}
            authorId={author.id}
            isLiked={isLiked}
        />
    );
};
