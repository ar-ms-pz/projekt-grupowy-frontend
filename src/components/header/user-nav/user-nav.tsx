import { User } from '../../../api/models/user';
import { getInitials } from '../../../utils/getInitials';
import { capitalize } from '../../../utils/capitalize';
import { useAuth } from '../../../hooks/use-auth';
import { useNavigate } from '@tanstack/react-router';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ThemeRadioGroup } from './theme-radio-group';

interface Props {
    user: User;
}

const STRINGS = {
    SIGN_OUT: 'Sign out',
    MY_POSTS: 'My Posts',
    ADMIN_PANEL: 'Admin Panel',
};

export const UserNav = ({ user }: Props) => {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full mr-4"
                >
                    <Avatar className="h-8 w-8">
                        {/* TODO */}
                        {/* <AvatarImage src="/avatars/01.png" alt="@shadcn" /> */}
                        <AvatarFallback>
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {capitalize(user.type)}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() =>
                            navigate({
                                to: '/users/$userId',
                                params: { userId: `${user.id}` },
                            })
                        }
                    >
                        {STRINGS.MY_POSTS}
                        <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    {user.type === 'ADMIN' && (
                        <DropdownMenuItem>
                            {STRINGS.ADMIN_PANEL}
                            <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    )}
                    <ThemeRadioGroup />
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOut}>
                    {STRINGS.SIGN_OUT}
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
