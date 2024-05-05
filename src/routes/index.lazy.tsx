import { createLazyFileRoute } from '@tanstack/react-router';
import { HomePage } from '../pages/home/home';
import { ErrorPage } from '../pages/error/error';

export const Route = createLazyFileRoute('/')({
    component: HomePage,
    errorComponent: ErrorPage,
});
