import { createFileRoute } from '@tanstack/react-router';
import { UserPage } from '../../pages/user/user';
import { ErrorPage } from '../../pages/error/error';

export const Route = createFileRoute('/users/$userId')({
    component: UserPage,
    parseParams: (params) => ({
        userId: Number(params.userId),
    }),
    errorComponent: ErrorPage,
});
