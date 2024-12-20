import { Suspense } from 'react';
import { PostConnector } from './connectors/post-connector';
import { useParams } from '@tanstack/react-router';
import { GlobalLoader } from '@/components/global-loader/global-loader';
import { PostEditor } from '@/components/post-editor/post-editor';
import { WallLayout } from '@/layouts/wall';

export const SinglePostPage = () => {
    const { postId } = useParams({
        from: '/posts/$postId/',
    });

    if (postId === 'new') {
        return (
            <WallLayout>
                <PostEditor />
            </WallLayout>
        );
    }

    return (
        <WallLayout>
            <Suspense fallback={<GlobalLoader />}>
                <PostConnector id={postId} />
            </Suspense>
        </WallLayout>
    );
};
