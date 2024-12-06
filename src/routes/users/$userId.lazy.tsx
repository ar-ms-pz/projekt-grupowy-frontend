import { createLazyFileRoute } from '@tanstack/react-router';
import { UserPage } from '../../pages/user/user';
import { ErrorPage } from '../../pages/error';

export const Route = createLazyFileRoute('/users/$userId')({
    component: UserPage,
    parseParams: (params) => ({
        userId: Number(params.userId),
    }),
    errorComponent: ErrorPage,
});
