import { Suspense } from 'react';
import { SinglePostConnector } from './connectors/post-connector';
import { useParams } from '@tanstack/react-router';

export const SinglePostPage = () => {
    const { postId } = useParams({
        from: '/posts/$postId',
    });

    return (
        <Suspense fallback={<p>Loading...</p>}>
            <SinglePostConnector id={+postId} />
        </Suspense>
    );
};
