export const Endpoints = {
    POSTS: '/posts',
    POST: '/posts/[id]',

    USER: '/users/[id]',

    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    EXTEND_SESSION: '/auth/extend-session',
} as const;

export type Endpoint = (typeof Endpoints)[keyof typeof Endpoints];
