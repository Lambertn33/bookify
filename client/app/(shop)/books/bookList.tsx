
import { StyleSheet } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import { Categories, Header, Search, Books } from '@/components/books';

const bookList = () => {
  const mockCategories = [
    {
      id: 1,
      name: 'Fiction',
    },
    {
      id: 2,
      name: 'Non-Fiction',
    },
    {
      id: 3,
      name: 'Biography',
    },
    {
      id: 4,
      name: 'Ancient History',
    },
    {
      id: 5,
      name: 'Science',
    },
    {
      id: 6,
      name: 'Technology',
    },
    {
      id: 7,
      name: 'Art',
    },
    {
      id: 8,
      name: 'Music',
    },
    {
      id: 9,
      name: 'Travel',
    },
    {
      id: 10,
      name: 'Cooking',
    },
    {
      id: 11,
      name: 'Health',
    },
    {
      id: 12,
      name: 'Religion',
    },
  ];

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
        categories={mockCategories} 
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