import { User } from './user';

export interface Post {
    id: number;
    image: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    author: User;
    likes: number;
    isLiked: boolean | null;
}
