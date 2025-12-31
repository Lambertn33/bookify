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
}

interface LogoutRequest {
    token: string;
}

export const register = async (request: RegisterRequest) => {
    const response = await api.post('/register', request);
    return response;
}

export const login = async (request: LoginRequest) => {
    const response = await api.post('/login', request);
    return response;
}

export const logout = async (request: LogoutRequest) => {
    const response = await api.post('/logout', request);
    return response.data;
}