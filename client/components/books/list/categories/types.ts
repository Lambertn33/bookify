export interface Category {
  id: number;
  name: string;
}

export interface CategoriesProps {
  categories: Category[] | undefined;
  title: string;
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  refetch?: () => void;
  selectedCategory?: number | null;
  handleSelectCategory?: (category: number) => void;
}



