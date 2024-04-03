import { Suspense } from 'react';
import { WallLayout } from '../../layouts/wall/wall-layout';
import { UserPostsConnector } from './posts/posts-connector';
import { useParams } from '@tanstack/react-router';
import { UserHeadingConnector } from './posts/heading-connector';

export const UserPage = () => {
    const { userId } = useParams({
        from: '/users/$userId',
    });

    return (
        <WallLayout>
            <Suspense fallback={<p>Loading...</p>}>
                <UserHeadingConnector userId={+userId} />
            </Suspense>
            <Suspense fallback={<p>Loading...</p>}>
                <UserPostsConnector userId={+userId} />
            </Suspense>
        </WallLayout>
    );
};
