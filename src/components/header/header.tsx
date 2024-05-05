import { Link } from '@tanstack/react-router';
import { STRINGS } from '../../strings';
import $ from './header.module.scss';
import { useUserContext } from '../../context/user-context';
import { UserNav } from './auth-nav/user-nav';
import { NoAuthNav } from './no-user-nav/no-auth-nav';

export const Header = () => {
    const user = useUserContext();

    return (
        <header className={$.header}>
            <Link to="/" className={$.link}>
                <img
                    className={$.logo}
                    src="/logo.webp"
                    alt={STRINGS.PG_LOGO}
                />
                <h1 className={$.headerText}>
                    {STRINGS.PLATFORMY_TECHNOLOGICZNE}
                </h1>
            </Link>

            {user ? <UserNav user={user} /> : <NoAuthNav />}
        </header>
    );
};
