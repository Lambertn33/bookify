import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder, getMyOrders as getMyOrdersApi } from '@/api';



interface CreateOrderObject {
    items: {book_id: number; quantity: number}[];
}

interface MyOrdersResponse {
    message: string;
    orders: {id: number; order_date: string; status: string; total: number}[];
}

export const useGetMyOrders = () => {
    const { data, isLoading, isError, error } = useQuery<MyOrdersResponse, Error, MyOrdersResponse>({
        queryKey: ['orders'],
        queryFn: () => getMyOrdersApi(),
    });
    return { data, isLoading, isError, error };
}

export const useCreateOrder = (options: {
    onSuccess?: (message: string) => void;
    onError?: (error: Error) => void;
    onSuccessCallback?: (message: string) => void;
}) => {
    const queryClient = useQueryClient();
    
    const createOrderMutation = useMutation({
        mutationFn: (order: CreateOrderObject) => createOrder(order),
        onSuccess: async(data) => {
            await queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: (error) => {
            options.onError?.(error);
        },
    });
    return createOrderMutation;
}