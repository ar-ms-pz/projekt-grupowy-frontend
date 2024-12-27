export interface User {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    type: 'ADMIN' | 'USER';
}
