import { Link } from '@tanstack/react-router';
import { Button } from '../../button/button';
import $ from './no-auth-nav.module.scss';

const STRINGS = {
    SIGN_IN: 'Sign in',
    SIGN_UP: 'Sign up',
};

export const NoAuthNav = () => {
    return (
        <nav className={$.buttons}>
            <Link to="/sign-in">
                <Button variant="secondary" asChild>
                    {STRINGS.SIGN_IN}
                </Button>
            </Link>
            <Link to="/sign-up">
                <Button asChild>{STRINGS.SIGN_UP}</Button>
            </Link>
        </nav>
    );
};
