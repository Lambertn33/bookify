import axios from 'axios';
import { getApiUrl } from '@/api/constants';

const api = axios.create({
    baseURL: getApiUrl(),
    timeout: 10000,
});

export const getCategories = async (
    page: number = 1,
    perPage: number = 10,
) => {
    const response = await api.get('/categories', {
        params: {
            page,
            per_page: perPage,
        },
    });
    return response.data;
}