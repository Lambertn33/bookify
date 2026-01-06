import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createOrder, getMyOrders as getMyOrdersApi , cancelOrder as cancelOrderApi } from '@/api';



interface CreateOrderObject {
    items: {book_id: number; quantity: number}[];
}

interface MyOrdersResponse {
    message: string;
    orders: {id: string; orderNumber: string; date: string; status: string; total: number; items: {id: number; title: string; quantity: number; price: number}[]}[];
}

export const useGetMyOrders = () => {
    const { data, isLoading, isError, error } = useQuery<MyOrdersResponse, Error, MyOrdersResponse>({
        queryKey: ['orders'],
        queryFn: () => getMyOrdersApi(),
    });
    return { data, isLoading, isError, error };
}

export const useCancelOrder = (options: {
    onSuccess?: (message: string) => void;
    onError?: (error: Error) => void;
    onSuccessCallback?: (message: string) => void;
}) => {
    const queryClient = useQueryClient();
    const cancelOrderMutation = useMutation({
        mutationFn: (orderId: string) => cancelOrderApi(orderId),
        onSuccess: async(data) => {
            await queryClient.invalidateQueries({ queryKey: ['orders'] });
            options.onSuccess?.(data?.message || 'Order cancelled successfully');
            options.onSuccessCallback?.(data?.message || 'Order cancelled successfully');
        },
        onError: (error) => {
            options.onError?.(error);
        },
    });
    return cancelOrderMutation;
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
            options.onSuccess?.(data?.message || 'Order created successfully');
            options.onSuccessCallback?.(data?.message || 'Order created successfully');
        },
        onError: (error) => {
            options.onError?.(error);
        },
    });
    return createOrderMutation;
}