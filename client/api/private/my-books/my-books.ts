import axios from 'axios';
import { getAuthHeaders } from '@/api/private/utils';
import { getApiUrl } from '@/api/constants';

const api = axios.create({
    baseURL: `${getApiUrl()}/my-books`,
    timeout: 10000,
});

export const getMyBooks = async() => {
    const headers = await getAuthHeaders();
    const response = await api.get('/', { headers });
    return response.data;
}