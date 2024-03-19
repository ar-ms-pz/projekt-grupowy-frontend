import { User } from './user';

export interface Post {
    id: number;
    image: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    likes: number;
    isLiked: boolean | null;
}
