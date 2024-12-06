import { createFileRoute } from '@tanstack/react-router';
import { MyPostsPage } from '@/pages/my-posts/my-posts';
import { ErrorPage } from '@/pages/error';

export const Route = createFileRoute('/my-posts')({
    component: MyPostsPage,
    errorComponent: ErrorPage,
});
