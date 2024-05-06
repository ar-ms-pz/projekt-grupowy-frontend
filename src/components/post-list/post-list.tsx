import { Link } from '@tanstack/react-router';
import { Post } from '../../api/models/post';
import { User } from '../../api/models/user';
import { useUserContext } from '../../context/user-context';
import { getImageUrl } from '../../utils/getImageUrl';
import { Button } from '../button/button';
import { PostListItem } from './item/post-list-item';
import $ from './post-list.module.scss';
import { AddPostModal } from '../post-modal/add-post-modal';
import { LogIn, PlusIcon } from 'lucide-react';
import { Loader } from '../loader/loader';
import { useEffect, useRef } from 'react';

interface Props {
    posts: Post[];
    isOtherUserWall?: boolean;
    fetchNextPage: () => void;
    isFetchingNextPage: boolean;
}

const STRINGS = {
    NO_POSTS_FOUND: 'No posts found',
    SIGN_UP_TO_ADD_POST: 'Sign up and add a post',
    ADD_YOUR_FIRST_POST: 'Add your first post',
    USER_HASNT_ADDED_POSTS_YET: "User hasn't added any posts yet",
    ADD_POST: 'Add Post',
};

const CallToAction = ({
    user,
    isOtherUserWall = false,
}: {
    user: User | null;
    isOtherUserWall: boolean;
}) => {
    if (isOtherUserWall)
        return (
            <p className={$.emptyDescription}>
                {STRINGS.USER_HASNT_ADDED_POSTS_YET}
            </p>
        );
    if (!user)
        return (
            <Link to="/sign-up">
                <Button asChild>
                    {STRINGS.SIGN_UP_TO_ADD_POST}
                    <LogIn size={20} />
                </Button>
            </Link>
        );
    return (
        <AddPostModal
            trigger={
                <Button asChild>
                    {STRINGS.ADD_POST}
                    <PlusIcon size={20} />
                </Button>
            }
        />
    );
};

export const PostList = ({
    posts,
    isOtherUserWall = false,
    fetchNextPage,
    isFetchingNextPage,
}: Props) => {
    const user = useUserContext();

    const ref = useRef<HTMLLIElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0 },
        );

        if (ref.current) observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchNextPage, ref]);

    if (!posts.length)
        return (
            <div className={$.empty}>
                <h2 className={$.emptyTitle}>{STRINGS.NO_POSTS_FOUND}</h2>
                <CallToAction user={user} isOtherUserWall={isOtherUserWall} />
            </div>
        );

    return (
        <ul className={$.list}>
            {posts.map(
                (
                    {
                        image,
                        description,
                        id,
                        createdAt,
                        isLiked,
                        likes,
                        author,
                    },
                    index,
                ) => (
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
                        ref={index === posts.length - 1 ? ref : undefined}
                    />
                ),
            )}

            {isFetchingNextPage && (
                <div className={$.loaderContainer}>
                    <Loader />
                </div>
            )}
        </ul>
    );
};
