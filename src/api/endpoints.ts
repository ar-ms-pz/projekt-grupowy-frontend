export const Endpoints = {
    POSTS: '/posts',
    POST: '/posts/[id]',

    USER: '/users/[id]',
} as const;

export type Endpoint = (typeof Endpoints)[keyof typeof Endpoints];
