import { createFileRoute } from '@tanstack/react-router';
import { SinglePostPage } from '../../pages/single-post/single-post';

export const Route = createFileRoute('/posts/$postId')({
    component: SinglePostPage,
    parseParams: (params) => ({
        postId: Number(params.postId),
    }),
});
