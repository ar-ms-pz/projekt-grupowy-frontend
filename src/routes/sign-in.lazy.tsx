import { createLazyFileRoute } from '@tanstack/react-router';
import { SignInPage } from '../pages/sign-in/sign-in';

export const Route = createLazyFileRoute('/sign-in')({
    component: SignInPage,
});
