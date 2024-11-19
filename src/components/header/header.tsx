import { useUserContext } from '../../context/user-context';
import { UserNav } from './user-nav/user-nav';
import { NoAuthNav } from './no-auth-nav';
import { Logo } from '../logo';

export const Header = () => {
    const user = useUserContext();

    return (
        <header className="border-b flex sticky justify-between h-16 items-center top-0 bg-background z-50">
            <Logo className="h-full" />
            {user ? <UserNav user={user} /> : <NoAuthNav />}
        </header>
    );
};
