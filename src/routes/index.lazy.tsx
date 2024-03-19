import { createLazyFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { PostList } from '../components/post-list/post-list';

export const PostsPage = () => {
    return (
        <>
            <h1>Posts</h1>
            <Suspense fallback={<div>Loading...</div>}>
                <PostList />
            </Suspense>
        </>
    );
};

export const Route = createLazyFileRoute('/')({
    component: PostsPage,
});
