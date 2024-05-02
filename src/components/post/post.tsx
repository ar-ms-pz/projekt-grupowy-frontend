import { Link } from '@tanstack/react-router';
import $ from './post.module.scss';
import { Avatar } from '../avatar/avatar';
import { getInitials } from '../../utils/getInitials';
import { capitalize } from '../../utils/capitalize';
import { RelativeDate } from '../relative-date/relative-date';
import { Button } from '../button/button';
import { Dropdown } from '../dropdown/dropdown';
import { useState } from 'react';
import { Pencil, Trash, X } from 'lucide-react';

type Props = {
    imageSrc: string;
    description: string | null;
    isLiked: boolean | null;
    authorName: string;
    authorId: number;
    createdAt: string;
};

const items = [
    {
        id: 'edit',
        text: 'Edit',
        icon: <Pencil size={20} />,
        onClick: () => {
            console.log('Edit');
        },
    },
    {
        id: 'delete',
        text: 'Delete',
        icon: <Trash size={20} />,
        onClick: () => {
            console.log('Delete');
        },
    },
];

export const Post = ({
    imageSrc,
    description,
    authorName,
    createdAt,
    authorId,
}: Props) => {
    const [isInfoLocked, setIsInfoLocked] = useState(false);

    return (
        <main className={$.wrapper}>
            <Link to="/">
                <Button
                    variant="ghost"
                    className={$.closeButton}
                    iconOnly
                    asChild
                >
                    <X size={20} />
                </Button>
            </Link>

            <Dropdown className={$.dropdown} items={items} />
            <img src={imageSrc} alt="Post" className={$.image} />

            <aside
                className={$.info}
                onClick={() => setIsInfoLocked((prev) => !prev)}
                style={{
                    opacity: isInfoLocked ? 1 : undefined,
                    pointerEvents: isInfoLocked ? 'auto' : undefined,
                }}
            >
                <div className={$.header}>
                    <div className={$.user}>
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
                    </div>
                    <RelativeDate className={$.createdDate} date={createdAt} />
                </div>
                <h2 className={$.description}>{description}</h2>
            </aside>
        </main>
    );
};
