import { StyleSheet, Pressable } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Categories, Search, Books } from '@/components/books';
import { AppHeader, AppIconWithBadge, AppView } from '@/components/ui';
import { useFetchCategories, useFetchBooks } from '@/hooks';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';


const bookList = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const handleChangeSearch = (text: string) => setSearch(text);

  const handleSelectCategory = (categoryId: number) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
  };

  const handleCartPress = () => {
    router.push('/(shop)/cart/CartScreen');
  };
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
    refetch: booksRefetch } = useFetchBooks({ page: 1, perPage: 10, search: debouncedSearch, categoryId: selectedCategory ?? undefined });

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <AppView style={styles.headerWrapper}>
        <AppHeader 
          title="Books List" 
          leftIcon={
            <AppIconWithBadge 
              icon={<MaterialIcons name="favorite-border" size={32} color="black" />} 
              cartCount={1} 
            />
          }
          rightIcon={
            <Pressable onPress={handleCartPress}>
              <AppIconWithBadge 
                icon={<Ionicons name="cart" size={32} color="black" />} 
                cartCount={1} 
              />
            </Pressable>
          }
        />
      </AppView>
      <Search 
        title="Read your favorite book"
        text="Discover the best books in the world"
        placeholder="Search a book...."
        search={search}
        handleChangeSearch={handleChangeSearch}
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
        selectedCategory={selectedCategory}
        handleSelectCategory={handleSelectCategory}
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
    paddingTop: 0,
    paddingBottom: 10,
  },
  headerWrapper: {
    marginTop: 0,
    marginBottom: 0,
  },
});

export default bookList;