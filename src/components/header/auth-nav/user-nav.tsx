import { ChevronDown, LogOut, User as UserIcon } from 'lucide-react';
import { User } from '../../../api/models/user';
import { getInitials } from '../../../utils/getInitials';
import { Avatar } from '../../avatar/avatar';
import $ from './user-nav.module.scss';
import { capitalize } from '../../../utils/capitalize';
import { Dropdown, DropdownItem } from '../../dropdown/dropdown';
import { useMemo } from 'react';
import { useAuth } from '../../../hooks/use-auth';
import { useNavigate } from '@tanstack/react-router';

interface Props {
    user: User;
}

export const UserNav = ({ user }: Props) => {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const items = useMemo<DropdownItem[]>(
        () => [
            {
                id: 'my-posts',
                text: 'My Posts',
                icon: <UserIcon size={20} />,
                onClick: () =>
                    navigate({
                        to: '/users/$userId',
                        params: { userId: `${user.id}` },
                    }),
            },
            {
                id: 'sign-out',
                text: 'Sign out',
                icon: <LogOut size={20} />,
                onClick: signOut,
            },
        ],
        [navigate, signOut, user.id],
    );

    return (
        <Dropdown
            items={items}
            className={$.dropdown}
            offsetPadding={2}
            shiftPadding={4}
        >
            <ChevronDown size={20} className={$.chevron} />
            <span>{capitalize(user.name)}</span>
            <Avatar initials={getInitials(user.name)} />
        </Dropdown>
    );
};
