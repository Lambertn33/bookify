import { useInfiniteQuery } from '@tanstack/react-query';
import { getCategories } from '@/api/public/categories/categories';

interface UseCategoriesProps {
    page?: number;
    perPage?: number;
}

interface Category {
    id: number;
    name: string;
}

interface CategoriesResponse {
    categories: {
        current_page: number;
        data: Category[];
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

export const useCategories = ({ page = 1, perPage = 10 }: UseCategoriesProps = {}) => {
    const { data, isLoading, isError, error, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } 
    = useInfiniteQuery<CategoriesResponse, Error, Category[], readonly unknown[], number>({
        queryKey: ['categories', page, perPage],
        queryFn: ({ pageParam = page }: { pageParam: number }) => getCategories(pageParam, perPage),
        getNextPageParam: (lastPage: CategoriesResponse) => {
            if (lastPage?.categories?.next_page_url) {
                return lastPage.categories.current_page + 1;
            }
            return undefined;
        },
        initialPageParam: page,
        staleTime: 1000 * 60 * 5,
        select: (data) => {
            if (!data || !data.pages) return [];
            return data.pages.flatMap((page: CategoriesResponse) => page?.categories?.data || []);
        },
    });
    return { data, isLoading, isError, error, isFetchingNextPage, hasNextPage, fetchNextPage, refetch };
}