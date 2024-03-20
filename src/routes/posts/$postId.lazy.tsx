import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { SinglePost } from '../../components/single-post/single-post';

const PostPage = () => {
    const { postId } = Route.useParams();
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SinglePost id={postId} />
        </Suspense>
    );
};

export const Route = createFileRoute('/posts/$postId')({
    component: PostPage,
    parseParams: (params) => ({
        postId: Number(params.postId),
    }),
});
