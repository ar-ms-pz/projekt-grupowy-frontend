import { ErrorPage } from '../pages/error';
import { createLazyFileRoute } from '@tanstack/react-router';
import { AdminPage } from '@/pages/admin/admin';

export const Route = createLazyFileRoute('/admin')({
    component: AdminPage,
    errorComponent: ErrorPage,
});
