import React from 'react';
import { AppView, AppTitle } from '@/components/ui';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IBooksProps, IBook } from './types';

import BookItem from './BookItem';
import Loading from './Loading';
import Error from './Error';
import Empty from './Empty';

const Books = ({ books, isLoading, isError, error, isFetchingNextPage, hasNextPage, fetchNextPage, refetch }: IBooksProps) => {
  const insets = useSafeAreaInsets();
  
  if (isLoading) {
    return <Loading />;
  }
  
  if (isError) {
    return <Error error={error} onRetry={refetch} />;
  }
  
  if (books?.length === 0) {
    return <Empty onRetry={refetch} />;
  }
  
  return (
    <AppView style={styles.booksContainer}>
      <AppTitle style={styles.booksTitle}>Available Books</AppTitle>
      <FlatList
        data={books}
        renderItem={({ item }: { item: IBook }) => <BookItem book={item} />}
        keyExtractor={(item: IBook) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: Math.max(insets.bottom, 20) + 40 }}
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
  );
};

const styles = StyleSheet.create({
  booksContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20,
    flex: 1
  },
  booksTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    lineHeight: 32,
    fontWeight: "600",
    marginBottom: 10,
  },
  booksLoadingFooter: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Books;