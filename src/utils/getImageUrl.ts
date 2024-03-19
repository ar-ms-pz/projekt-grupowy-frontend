import { API_URL } from '../config';

export const getImageUrl = (url: string) => {
    return `${API_URL}/${url}`;
};
