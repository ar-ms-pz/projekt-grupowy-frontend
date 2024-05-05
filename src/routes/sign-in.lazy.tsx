import { createLazyFileRoute } from '@tanstack/react-router';
import { SignInPage } from '../pages/sign-in/sign-in';
import { ErrorPage } from '../pages/error/error';

export const Route = createLazyFileRoute('/sign-in')({
    component: SignInPage,
    errorComponent: ErrorPage,
});
