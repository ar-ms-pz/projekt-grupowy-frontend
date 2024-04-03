import { Link } from '@tanstack/react-router';
import $ from './post-list-item.module.scss';
import { Avatar } from '../../avatar/avatar';
import { getInitials } from '../../../utils/getInitials';
import { capitalize } from '../../../utils/capitalize';
import { Button } from '../../button/button';
import { StringWithParams } from '../../string/string';
import { STRINGS } from '../../../strings';
import { HeartFilledIcon } from '../../icons/heart-fillted';
import { HeartIcon } from '../../icons/heart';
import { RelativeDate } from '../../relative-date/relative-date';
import { Dropdown } from '../../dropdown/dropdown';
import { Pencil1Icon, TrashIcon } from '@radix-ui/react-icons';

const isLoggedIn = false;

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

const items = [
    {
        id: 'edit',
        text: 'Edit',
        icon: <Pencil1Icon />,
        onClick: () => {
            console.log('Edit');
        },
    },
    {
        id: 'delete',
        text: 'Delete',
        icon: <TrashIcon />,
        onClick: () => {
            console.log('Delete');
        },
    },
];

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
    <article className={$.wrapper}>
        <div className={$.header}>
            <Link
                to="/users/$userId"
                params={{
                    userId: authorId.toString(),
                }}
                className={$.author}
            >
                <Avatar initials={getInitials(authorName)} />
                {capitalize(authorName)}
            </Link>

            <Dropdown items={items} />
        </div>
        <h2 className={$.description}>{description}</h2>
        <Link
            to={`/posts/$postId`}
            params={{
                postId: id.toString(),
            }}
            className={$.imageWrapper}
        >
            <img
                src={imageSrc}
                alt={description ?? 'Post image'}
                className={$.image}
            />
        </Link>
        <div className={$.bottomWrapper}>
            {/* TODO: Auth */}
            <Button variant="ghost" className={$.button} disabled={!isLoggedIn}>
                {isLiked ? (
                    <HeartFilledIcon height={24} width={24} />
                ) : (
                    <HeartIcon height={24} width={24} />
                )}
                <StringWithParams
                    value={
                        likes === 1
                            ? STRINGS.LIKED_BY_SINGLE
                            : STRINGS.LIKED_BY_MANY
                    }
                    params={{
                        likes: likes.toString(),
                    }}
                />
            </Button>
            <RelativeDate className={$.createdDate} date={createdAt} />
        </div>
    </article>
);
