import { getDataFromLocalStorage } from '@/helpers/auth';

export const getAuthHeaders = async() => {
    const { token } = await getDataFromLocalStorage();
    return {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
    };
}