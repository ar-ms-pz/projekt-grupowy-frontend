import { Link } from '@tanstack/react-router';
import { STRINGS } from '../../strings';
import logo from '../../assets/logo.png';
import $ from './header.module.scss';
import { Button } from '../button/button';

export const Header = () => {
    return (
        <header className={$.header}>
            <Link to="/" className={$.link}>
                <img className={$.logo} src={logo} alt={STRINGS.PG_LOGO} />
                <h1 className={$.headerText}>
                    {STRINGS.PLATFORMY_TECHNOLOGICZNE}
                </h1>
            </Link>

            <nav className={$.buttons}>
                {/* TODO */}
                <Link to="/">
                    <Button variant="secondary" asChild>
                        {STRINGS.SIGN_IN}
                    </Button>
                </Link>
                <Link to="/">
                    <Button asChild>{STRINGS.SIGN_UP}</Button>
                </Link>
            </nav>
        </header>
    );
};
