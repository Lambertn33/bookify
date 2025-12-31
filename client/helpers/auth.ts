import { login, register } from "@/api";
import { AxiosResponse } from "axios";

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
    defaultSuccessMessage: string,
    defaultFailureMessage: string
): Promise<AuthResponse> => {
    try {
        const response = await apiCall;
        
        const status = response.status;
        const data = response.data;
        
        if (status === 200) {
            return {
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
        'Login successful',
        'Login failed'
    );
}

export const handleRegister = async (names: string, email: string, password: string): Promise<AuthResponse> => {
    return processAuthResponse(
        register({ names, email, password }),
        'Registration successful',
        'Registration failed'
    );
}