import { Suspense } from 'react';
import { WallLayout } from '../../layouts/wall/wall-layout';
import { PostsConnector } from './connectors/posts-connector';
import { STRINGS } from '../../strings';
import { Heading } from '../../components/heading/heading';

export const HomePage = () => (
    <WallLayout>
        <Heading heading={STRINGS.NEWEST_POSTS} />
        <Suspense fallback={<p>Loading...</p>}>
            <PostsConnector />
        </Suspense>
    </WallLayout>
);
