import { useQuery } from '@tanstack/react-query';
import { getMyBooks } from '@/api';

interface MyBooksResponse {
    message: string;
    books: {id: number; title: string; cover_image_url: string; book_path_url: string}[];
}

export const useGetMyBooks = () => {
    const { data, isLoading, isError, error } = useQuery<MyBooksResponse, Error, MyBooksResponse>({
        queryKey: ['my-books'],
        queryFn: () => getMyBooks(),
    });
    return { data, isLoading, isError, error };
}