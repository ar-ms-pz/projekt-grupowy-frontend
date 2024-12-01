import { ErrorComponentProps, Link } from '@tanstack/react-router';
import { FetchError } from '../../api/fetch-error';
import { getErrorText } from '../../helpers/get-error-text';
import { ErrorCodes } from '../../api/error-codes';
import $ from './error.module.scss';
import { Home } from 'lucide-react';
import { Button } from '../../components/button/button';

const STRINGS = {
    HOME_PAGE: 'Home Page',
};

export const ErrorPage = ({ error }: ErrorComponentProps) => {
    if (error instanceof FetchError || error instanceof Response) {
        const messages =
            error instanceof FetchError
                ? error.errors.map((err) => getErrorText(err.code))
                : [error.statusText];

        return (
            <div className={$.container}>
                <h1 className={$.title}>{error.status || 500}</h1>
                <div className={$.divider} />
                {messages.map((message) => (
                    <p className={$.error} key={message}>
                        {message}
                    </p>
                ))}
                <Link to="/" className={$.link}>
                    <Button className={$.button} asChild>
                        <Home />
                        {STRINGS.HOME_PAGE}
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className={$.container}>
            <h1 className={$.title}>500</h1>
            <p className={$.error}>
                {getErrorText(ErrorCodes.INTERNAL_SERVER_ERROR)}
            </p>
        </div>
    );
};
