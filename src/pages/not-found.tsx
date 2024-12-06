import { Link } from '@tanstack/react-router';
import { Header } from '../components/header/header';
import { Home } from 'lucide-react';
import { useCurrentUser } from '../api/users/use-current-user';
import { UserProvider } from '../context/user-context';
import { Button } from '@/components/ui/button';

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
            <div className="flex flex-col justify-center items-center h-[calc(100vh-3.75rem)] gap-3">
                <h1 className="text-4xl font-semibold">{STRINGS[404]}</h1>
                <div className="border-b w-40" />
                <h2 className="text-xl font-medium">
                    {STRINGS.PAGE_NOT_FOUND}
                </h2>
                <p className="my-4 text-center max-w-lg mx-12">
                    {STRINGS.DESCRIPTION}
                </p>
                <Button asChild>
                    <Link to="/">
                        <Home />
                        {STRINGS.HOME_PAGE}
                    </Link>
                </Button>
            </div>
        </UserProvider>
    );
};
