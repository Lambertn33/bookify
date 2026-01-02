import axios from 'axios';
import { getApiUrl } from '@/api/constants';

const api = axios.create({
    baseURL: `${getApiUrl()}/auth`,
    timeout: 10000,
});

interface LoginRequest {
    email: string;
    password: string;
}

interface RegisterRequest extends LoginRequest {
    names: string;
    phone: string;
    address: string;
    city: string;
}

export const register = async (request: RegisterRequest) => {
    const response = await api.post('/register', request);
    return response;
}

export const login = async (request: LoginRequest) => {
    const response = await api.post('/login', request);
    return response;
}

export const logout = async (token: string) => {
    const response = await api.post('/logout', {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response;
}