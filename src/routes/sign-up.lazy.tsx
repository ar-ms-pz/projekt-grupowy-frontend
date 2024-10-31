import { createLazyFileRoute } from '@tanstack/react-router';
import { ErrorPage } from '../pages/error/error';
import { SignUpPage } from '@/pages/sign-up';

export const Route = createLazyFileRoute('/sign-up')({
    component: SignUpPage,
    errorComponent: ErrorPage,
});
