import axios from 'axios';
import { getAuthHeaders } from '@/api/private/utils';
import { getApiUrl } from '@/api/constants';

interface OrderItem {
    book_id: number;
    quantity: number;
}

interface Order {
    items: OrderItem[];
}

const api = axios.create({
    baseURL: `${getApiUrl()}/orders`,
    timeout: 10000,
});

export const getMyOrders = async() => {
    const headers = await getAuthHeaders();
    const response = await api.get('/', { headers });
    return response.data;
}

export const createOrder = async(order: Order) => {
    const headers = await getAuthHeaders();
    const response = await api.post('/', order, { headers });
    return response.data;
}