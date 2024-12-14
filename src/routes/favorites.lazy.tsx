import { createLazyFileRoute } from '@tanstack/react-router';
import { ErrorPage } from '@/pages/error';
import { FavoritePostsPage } from '@/pages/favorites/favorites';

export const Route = createLazyFileRoute('/favorites')({
    component: FavoritePostsPage,
    errorComponent: ErrorPage,
});
