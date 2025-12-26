import React from 'react';
import { AppText, AppView } from '@/components/ui';
import { StyleSheet, FlatList } from 'react-native';
import { CategoriesProps, Category } from './types';

import CategoryItem from './CategoryItem';
import Loading from './Loading';
import Error from './Error';
import Empty from './Empty';

const Categories = ({ categories, title, isLoading, isError, error, refetch }: CategoriesProps) => {
  if (isLoading) {
    return <Loading />;
  }
  
  if (isError) {
    return <Error error={error} onRetry={refetch} />;
  }
  
  if (categories?.length === 0) {
    return <Empty />;
  }

  return (
    <AppView style={styles.categoriesContainer}>
      <AppText style={styles.categoriesTitle}>{title}</AppText>
      <FlatList
        data={categories || []}
        renderItem={({ item }: { item: Category }) => <CategoryItem category={item} />}
        keyExtractor={(item: Category) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </AppView>
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 10,
  },
  categoriesTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    textAlign: "center",
    lineHeight: 32,
    fontWeight: "600",
  },
});

export default Categories;