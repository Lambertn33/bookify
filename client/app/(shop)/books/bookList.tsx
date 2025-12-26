import { ActivityIndicator, StyleSheet } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Categories, Header, Search, Books } from '@/components/books';
import { useCategories } from '@/hooks/useCategories';
import { AppText } from '@/components/ui';

const bookList = () => {
  const { data: categories, isLoading, isError, error, isFetchingNextPage, hasNextPage, fetchNextPage, refetch } = useCategories({ page: 1, perPage: 10 });

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }
  if (isError) {
    return (
      <SafeAreaView style={styles.container} edges={["top"]}>
        <AppText>Error loading categories</AppText>
        {error && <AppText>{error.message || 'Unknown error'}</AppText>}
      </SafeAreaView>
    );
  }

  const mockBooks = [
    {
      id: 1,
      category: 'Fiction',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 10.00,
    },
    {
      id: 2,
      category: 'Non-Fiction',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 100.00,
    },
    {
      id: 3,
      category: 'Biography',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 100.00,
    },
    {
      id: 4,
      category: 'Ancient History',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 100.00,
    },
  ];
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <Header title="Books List" />
      <Search 
        title="Read your favorite book"
        text="Discover the best books in the world"
        placeholder="Search a book...."
      />

      <Categories 
        categories={categories || []} 
        title="Top Rated Categories"
       />
       
      <Books books={mockBooks} />
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