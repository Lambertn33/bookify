import { useQuery } from '@tanstack/react-query';
import { getBook } from '@/api/public/books/books';

interface Book {
    id: number;
    title: string;
    description?: string;
    author: string;
    price: string;
    cover_image_url?: string;
    book_path?: string;
    published_year?: number;
    category: {
        id: number;
        name: string;
    };
}

interface BookResponse {
    book: Book;
}

export const useFetchBook = (id: number) => {
    const { data, isLoading, isError, error, refetch } = useQuery<BookResponse, Error>({
        queryKey: ['book', id],
        queryFn: () => getBook(id),
        staleTime: 1000 * 60 * 5,
    });

    return {
        book: data?.book,
        isLoading,
        isError,
        error,
        refetch,
    };
};

