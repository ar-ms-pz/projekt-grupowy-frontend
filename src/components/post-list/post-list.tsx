import { Post } from '../../api/models/post';
import { getImageUrl } from '../../utils/getImageUrl';
import { PostListItem } from './item/post-list-item';
import $ from './post-list.module.scss';

interface Props {
    posts: Post[];
}

export const PostList = ({ posts }: Props) => {
    return (
        <ul className={$.list}>
            {posts.map(
                ({
                    image,
                    description,
                    id,
                    createdAt,
                    isLiked,
                    likes,
                    author,
                }) => (
                    <PostListItem
                        key={id}
                        id={id}
                        imageSrc={getImageUrl(image)}
                        description={description}
                        likes={likes}
                        isLiked={isLiked}
                        authorName={author.name}
                        authorId={author.id}
                        createdAt={createdAt}
                    />
                ),
            )}
        </ul>
    );
};
