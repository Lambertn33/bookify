import axios from 'axios';
import { getApiUrl } from '@/api/constants';

const api = axios.create({
    baseURL: getApiUrl(),
    timeout: 10000,
});

export const getBooks = async (
    page: number = 1,
    perPage: number = 10,
    categoryId?: number,
    search?: string,
) => {
    const response = await api.get('/books', {
        params: {
            page,
            per_page: perPage,
            category_id: categoryId,
            search: search,
        },
    });
    return response.data;
}

export const getBook = async (id: number) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
}