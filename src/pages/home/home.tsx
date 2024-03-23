import { Suspense } from 'react';
import { WallLayout } from '../../layouts/wall/wall-layout';
import { PostsConnector } from './posts/posts-connector';
import { STRINGS } from '../../strings';

export const HomePage = () => {
    return (
        <WallLayout heading={STRINGS.NEWEST_POSTS}>
            <Suspense fallback={<p>Loading...</p>}>
                <PostsConnector />
            </Suspense>
        </WallLayout>
    );
};
