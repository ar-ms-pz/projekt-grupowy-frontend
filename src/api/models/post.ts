import { Image } from './image';
import { User } from './user';

export type PostStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED' | 'DELETED';
export type PostType = 'RENTAL' | 'SALE';

export interface Post {
    id: number;
    images: Image[];
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    author: User;
    favorites: number;
    isFavorite: boolean | null;
    latitude: number;
    longitude: number;
    address: string;
    area: number;
    price: number;
    rooms: number;
    status: PostStatus;
    type: PostType;
}
