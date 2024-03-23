import { Link } from '@tanstack/react-router';

interface Props {
    imageSrc: string;
    description: string | null;
    id: number;
    likes: number;
    isLiked: boolean | null;
    authorName: string;
    authorId: number;
    createdAt: string;
}

export const PostListItem = ({
    imageSrc,
    id,
    description,
    likes,
    isLiked,
    authorName,
    createdAt,
    authorId,
}: Props) => (
    <div>
        <p>
            <Link
                to="/users/$userId"
                params={{
                    userId: authorId.toString(),
                }}
            >
                {authorName} at {createdAt}
            </Link>
        </p>
        <img src={imageSrc} alt={description ?? 'Post image'} />
        <h3>{description}</h3>
        <p>
            <Link
                to={`/posts/$postId`}
                params={{
                    postId: id.toString(),
                }}
            >
                View
            </Link>
        </p>
        <p>{likes}</p>
        {isLiked !== null && (
            <button>{isLiked ? 'like' : 'remove like'}</button>
        )}
    </div>
);
