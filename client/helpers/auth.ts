import { login, register, logout } from "@/api";
import { AxiosResponse } from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    id: number;
    names: string;
    email: string;
    role: string;
}

interface AuthResponse {
    message: string;
    status: number;
    user?: User;
    token?: string;
}

interface AuthResponseData {
    message?: string;
    user?: User;
    token?: string;
}

const processAuthResponse = async (
    apiCall: Promise<AxiosResponse<AuthResponseData>>,
    isLogout: boolean = false,
    defaultSuccessMessage: string,
    defaultFailureMessage: string
): Promise<AuthResponse> => {
    try {
        const response = await apiCall;
        
        const status = response.status;
        const data = response.data;
        
        if (status === 200) {
            return isLogout ? {
                message: data.message || defaultSuccessMessage,
                status: status,
            } : {
                message: data.message || defaultSuccessMessage,
                status: status,
                user: data.user,
                token: data.token,
            };
        } else {
            return {
                message: data.message || defaultFailureMessage,
                status: status,
            };
        }
    } catch (error: any) {
        const status = error.response?.status || 500;
        const message = error.response?.data?.message || error.message || 'An error occurred';
        
        return {
            message: message,
            status: status,
        };
    }
}

export const handleLogin = async (email: string, password: string): Promise<AuthResponse> => {
    return processAuthResponse(
        login({ email, password }),
        false,
        'Login successful',
        'Login failed'
    );
}

export const handleRegister = async (names: string, email: string, password: string): Promise<AuthResponse> => {
    return processAuthResponse(
        register({ names, email, password }),
        false,
        'Registration successful',
        'Registration failed'
    );
}

export const saveDataToLocalStorage = async(token: string, user: User) => {
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('user', JSON.stringify(user));
}

export const clearLocalStorage = async() => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
}

export const getDataFromLocalStorage = async() => {
    const token = await AsyncStorage.getItem('token');
    const user = await AsyncStorage.getItem('user');
    return { token: token || null, user: user ? JSON.parse(user) : null };
}

export const handleLogout = async() => {
    const { token } = await getDataFromLocalStorage();
    if (token) {
        await clearLocalStorage();
        return processAuthResponse(
            logout(token),
            true,
            'Logout successful',
            'Logout failed'
        );
    } else {
        return {
            message: 'No token found',
            status: 401,
        };
    }
}