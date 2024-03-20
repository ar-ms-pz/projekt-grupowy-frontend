import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { SingleUser } from '../../components/single-user.tsx/single-user';

const UserPage = () => {
    const { userId } = Route.useParams();

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SingleUser id={userId} />
        </Suspense>
    );
};

export const Route = createFileRoute('/users/$userId')({
    component: UserPage,
    parseParams: (params) => ({
        userId: Number(params.userId),
    }),
});
