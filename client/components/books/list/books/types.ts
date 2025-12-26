export interface IBook {
  id: number;
  title: string;
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

export interface IBooksProps {
  books: IBook[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  refetch?: () => void;
}

