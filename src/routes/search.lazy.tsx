import { SearchPage } from '@/pages/search/search';
import { ErrorPage } from '../pages/error';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/search')({
    component: SearchPage,
    errorComponent: ErrorPage,
});
