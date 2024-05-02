import { createLazyFileRoute } from '@tanstack/react-router';
import { SignUpPage } from '../pages/sign-up/sign-up';

export const Route = createLazyFileRoute('/sign-up')({
    component: SignUpPage,
});
