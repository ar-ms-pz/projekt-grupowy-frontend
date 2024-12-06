import { createLazyFileRoute } from '@tanstack/react-router';
import { ErrorPage } from '../pages/error';
import { SignInPage } from '@/pages/sign-in';

export const Route = createLazyFileRoute('/sign-in')({
    component: SignInPage,
    errorComponent: ErrorPage,
});
