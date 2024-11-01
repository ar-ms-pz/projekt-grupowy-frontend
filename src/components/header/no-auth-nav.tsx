import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '../theme-toggle';

const STRINGS = {
    SIGN_IN: 'Sign in',
    SIGN_UP: 'Sign up',
};

export const NoAuthNav = () => {
    return (
        <nav className="flex mr-4 items-center">
            <ThemeToggle />
            <Button variant="link" asChild>
                <Link to="/sign-in">{STRINGS.SIGN_IN}</Link>
            </Button>
            <Button asChild>
                <Link to="/sign-up">{STRINGS.SIGN_UP}</Link>
            </Button>
        </nav>
    );
};
