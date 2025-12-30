import { StyleSheet } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Categories, Search, Books } from '@/components/books';
import { AppHeader } from '@/components/ui';
import { useFetchCategories, useFetchBooks } from '@/hooks';
import { Octicons } from '@expo/vector-icons';


const bookList = () => {
  const { 
    data: categories,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError, 
    error: categoriesError, 
    isFetchingNextPage: isCategoriesFetchingNextPage, 
    hasNextPage: isCategoriesHasNextPage, 
    fetchNextPage: categoriesFetchNextPage, 
    refetch: categoriesRefetch }
  = useFetchCategories({ page: 1, perPage: 10 });

  const { 
    data: books,
    isLoading: isBooksLoading,
    isError: isBooksError,
    error: booksError,
    isFetchingNextPage: isBooksFetchingNextPage,
    hasNextPage: isBooksHasNextPage,
    fetchNextPage: booksFetchNextPage,
    refetch: booksRefetch } = useFetchBooks({ page: 1, perPage: 10 });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <AppHeader 
        title="Books List" 
        leftIcon={<Octicons name="bell-fill" size={24} color="black" />}
        rightIcon={<Octicons name="filter" size={24} color="black" />}
      />
      <Search 
        title="Read your favorite book"
        text="Discover the best books in the world"
        placeholder="Search a book...."
      />

      <Categories 
        categories={categories || []} 
        title="Top Rated Categories"
        isLoading={isCategoriesLoading}
        isError={isCategoriesError}
        error={categoriesError}
        isFetchingNextPage={isCategoriesFetchingNextPage}
        hasNextPage={isCategoriesHasNextPage}
        fetchNextPage={categoriesFetchNextPage}
        refetch={categoriesRefetch}
       />
       
      <Books
        books={books || []}
        isLoading={isBooksLoading}
        isError={isBooksError}
        error={booksError}
        isFetchingNextPage={isBooksFetchingNextPage}
        hasNextPage={isBooksHasNextPage}
        fetchNextPage={booksFetchNextPage}
        refetch={booksRefetch}
       />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default bookList;