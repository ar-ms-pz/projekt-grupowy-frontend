import { Link } from '@tanstack/react-router';
import { Button } from '../../components/button/button';
import { Header } from '../../components/header/header';
import $ from './not-found.module.scss';
import { Home } from 'lucide-react';
import { useCurrentUser } from '../../api/users/use-current-user';
import { UserProvider } from '../../context/user-context';

const STRINGS = {
    404: '404',
    HOME_PAGE: 'Home Page',
    PAGE_NOT_FOUND: 'Page not found',
    DESCRIPTION:
        'The page you are looking for might have been removed, had its name changed or is temporarily unavailable.',
};

export const NotFoundPage = () => {
    const { data } = useCurrentUser();

    return (
        <UserProvider value={data.data}>
            <Header />
            <div className={$.container}>
                <h1 className={$.title}>{STRINGS[404]}</h1>
                <div className={$.divider} />
                <h2 className={$.subtitle}>{STRINGS.PAGE_NOT_FOUND}</h2>
                <p className={$.description}>{STRINGS.DESCRIPTION}</p>
                <Link to="/">
                    <Button className={$.button} asChild>
                        <Home />
                        {STRINGS.HOME_PAGE}
                    </Button>
                </Link>
            </div>
        </UserProvider>
    );
};
