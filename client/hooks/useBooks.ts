import { useInfiniteQuery } from '@tanstack/react-query';
import { getBooks } from '@/api';

interface UseBooksProps {
    page?: number;
    perPage?: number;
    categoryId?: number;
    search?: string;
}

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

interface BooksResponse {
    books: {
        current_page: number;
        data: Book[];
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: {
            url: string | null;
            label: string;
            page: number | null;
            active: boolean;
        }[];
        next_page_url: string | null;
        path: string;
    };
}

export const useFetchBooks = ({ page = 1, perPage = 10, categoryId, search }: UseBooksProps = {}) => {
    const { data, isLoading, isError, error, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } 
    = useInfiniteQuery<BooksResponse, Error, Book[], readonly unknown[], number>({
        queryKey: ['books', page, perPage, categoryId, search],
        queryFn: ({ pageParam = page }: { pageParam: number }) => getBooks(pageParam, perPage, categoryId, search),
        getNextPageParam: (lastPage: BooksResponse) => {
            if (lastPage?.books?.next_page_url) {
                return lastPage.books.current_page + 1;
            }
            return undefined;
        },
        initialPageParam: page,
        staleTime: 1000 * 60 * 5,
        select: (data) => {
            if (!data || !data.pages) return [];
            return data.pages.flatMap((page: BooksResponse) => page?.books?.data || []);
        },
    });
    return { data, isLoading, isError, error, isFetchingNextPage, hasNextPage, fetchNextPage, refetch };
}