import { ErrorComponentProps, Link } from '@tanstack/react-router';
import { FetchError } from '../api/fetch-error';
import { getErrorText } from '../api/helpers/get-error-text';
import { ErrorCodes } from '../api/error-codes';
import { Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/header/header';

const STRINGS = {
    HOME_PAGE: 'Home Page',
    INTERNAL_SERVER_ERROR_CODE: '500',
};

export const ErrorPage = ({ error }: ErrorComponentProps) => {
    if (error instanceof FetchError || error instanceof Response) {
        const messages =
            error instanceof FetchError
                ? error.errors.map((err) => getErrorText(err.code))
                : [error.statusText];

        return (
            <>
                <Header />
                <div className="flex flex-col justify-center items-center h-[calc(100vh-3.75rem)] gap-3">
                    <h1 className="text-4xl font-semibold">
                        {error.status || STRINGS.INTERNAL_SERVER_ERROR_CODE}
                    </h1>
                    <div className="border-b w-40" />
                    {messages.map((message) => (
                        <p className="text-lg font-medium" key={message}>
                            {message}
                        </p>
                    ))}
                    <Button asChild className="mt-6">
                        <Link to="/">
                            <Home />
                            {STRINGS.HOME_PAGE}
                        </Link>
                    </Button>
                </div>
            </>
        );
    }

    return (
        <>
            <Header />
            <div className="flex flex-col justify-center items-center h-[calc(100vh-3.75rem)] gap-3">
                <h1 className="text-4xl font-semibold">
                    {STRINGS.INTERNAL_SERVER_ERROR_CODE}
                </h1>
                <div className="border-b w-40" />
                <p className="text-lg font-medium">
                    {getErrorText(ErrorCodes.INTERNAL_SERVER_ERROR)}
                </p>
            </div>
        </>
    );
};
