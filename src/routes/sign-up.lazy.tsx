import { createLazyFileRoute } from '@tanstack/react-router';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { ErrorPage } from '../pages/error/error';

export const Route = createLazyFileRoute('/sign-up')({
    component: SignUpPage,
    errorComponent: ErrorPage,
});
