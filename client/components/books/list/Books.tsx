
import React from 'react'
import { AppView , AppTitle, AppText} from '@/components/ui'
import { StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import { Image } from 'expo-image'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface IBook {
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

interface IBooksProps {
  books: IBook[];
  isLoading?: boolean;
  isError?: boolean;
  error?: Error | null;
  isFetchingNextPage?: boolean;
  hasNextPage?: boolean;
  fetchNextPage?: () => void;
  refetch?: () => void;
}

const BookItem = ({ book }: { book: IBook }) => {
  return (
    <AppView style={styles.bookContainer}>
      <AppView style={styles.bookInfoAndImageContainer}>
        <AppView style={styles.bookImageContainer}>
          <Image 
            source={{ uri: book.cover_image_url }}  
            style={styles.bookImage}
            contentFit="cover"
          />
        </AppView>
        <AppView style={styles.bookInfoContainer}>
          <AppText style={styles.bookCategory} numberOfLines={1}>{book.category.name}</AppText>
          <AppTitle style={styles.bookTitle} numberOfLines={2} ellipsizeMode="tail">{book.title}</AppTitle>
          <AppText style={styles.bookAuthor} numberOfLines={1}>{book.author}</AppText>
        </AppView>
      </AppView>
      <AppView style={styles.bookPriceContainer}>
        <AppText style={styles.bookPrice}>${book.price}</AppText>
      </AppView>
    </AppView>
  )
}

const Books = ({ books, isLoading, isError, error, isFetchingNextPage, hasNextPage, fetchNextPage, refetch }: IBooksProps) => {
  const insets = useSafeAreaInsets();
  
  if (isLoading) {
    return (
      <AppView style={styles.booksLoadingContainer}>
        <ActivityIndicator size="small" color="#4B5320" />
      </AppView>
    );
  }
  if (isError) {
    return (
      <AppView style={styles.booksErrorContainer}>
        {error && <AppText style={styles.booksErrorText}>{error.message || 'Unknown error'}</AppText>}
        <TouchableOpacity onPress={refetch}>
          <AppText style={styles.booksErrorRetryButton}>Retry</AppText>
        </TouchableOpacity>
      </AppView>
    );
  }
  if (books?.length === 0) {
    return (
      <AppView style={styles.booksEmptyContainer}>
        <AppText style={styles.booksErrorText}>No books found</AppText>
        <TouchableOpacity onPress={refetch}>
          <AppText style={styles.booksErrorRetryButton}>Retry</AppText>
        </TouchableOpacity>
      </AppView>
    );
  }
  return (
    <AppView style={styles.booksContainer}>
      <AppTitle style={styles.booksTitle}>Available Books</AppTitle>
      <FlatList
        data={books}
        renderItem={({ item }: { item: IBook }) => <BookItem book={item} />}
        keyExtractor={(item: IBook) => item.id.toString()}
        contentContainerStyle={[
          styles.flatListContent,
          { paddingBottom: Math.max(insets.bottom, 20) + 100 } // Tab bar (70) + bottom (15) + extra spacing
        ]}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage?.();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <AppView style={styles.booksLoadingFooter}>
              <ActivityIndicator size="small" color="#4B5320" />
            </AppView>
          ) : null
        }
      />  
    </AppView>
  )
}

const styles = StyleSheet.create({
  booksErrorText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "red",
    textAlign: "center",
    lineHeight: 32,
    fontWeight: "600",
  },
  booksErrorRetryButton: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    textAlign: "center",
    lineHeight: 32,
    fontWeight: "600",
  },
  booksEmptyText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    textAlign: "center",
    lineHeight: 32,
    fontWeight: "600",
  },
  booksLoadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  booksLoadingFooter: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  booksErrorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  booksEmptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  booksContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20,
  },

  flatListContent: {
    paddingBottom: 20,
  },

  booksTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    lineHeight: 32,
    fontWeight: "600",
    marginBottom: 10,
  },

  bookContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    overflow: 'hidden',
    height: 100,
    paddingRight: 16,
  },

  bookInfoAndImageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    flex: 1,
    minWidth: 0,
  },

  bookImageContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    elevation: 10,
    flexShrink: 0,
  },
  bookImage: {
    width: '100%',
    height: '100%',
  },
  bookInfoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0,
    flex: 1,
    minWidth: 0,
  },
  bookCategory: {
    fontSize: 14,
    fontFamily: "Poppins_800ExtraBold",
    color: "#4B5320",
  },
  bookTitle: {
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    color: "#000000",
    width: '100%',
  },
  bookAuthor: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    opacity: 0.4,
  },
  bookPrice: {
    fontSize: 14,
    fontFamily: "Poppins_700Bold",
    color: "#ffffff",
  },
  bookPriceContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexShrink: 0,
  },
})

export default Books