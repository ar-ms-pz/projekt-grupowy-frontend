import { createFileRoute } from '@tanstack/react-router';
import { UserPage } from '../../pages/user/user';

export const Route = createFileRoute('/users/$userId')({
    component: UserPage,
    parseParams: (params) => ({
        userId: Number(params.userId),
    }),
});
