import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { AppText, AppView } from '@/components/ui'
import { TouchableOpacity } from 'react-native'

interface Category {
    id: number;
    name: string;
}

interface CategoriesProps {
    categories: Category[] | undefined;
    title: string;
    isLoading?: boolean;
    isError?: boolean;
    error?: Error | null;
    isFetchingNextPage?: boolean;
    hasNextPage?: boolean;
    fetchNextPage?: () => void;
    refetch?: () => void;
}

const CategoryItem = ({ category }: { category: Category }) => {
  return (
      <TouchableOpacity>
        <AppView style={styles.categoryItem}>
          <AppText style={styles.categoryItemText}>{category.name}</AppText>
        </AppView>
      </TouchableOpacity>
  );
};

const Categories = ({ categories, title, isLoading, isError, error, isFetchingNextPage, hasNextPage, fetchNextPage, refetch }: CategoriesProps) => {
  if (isLoading) {
    return (
      <AppView style={styles.categoriesLoadingContainer}>
        <ActivityIndicator size="small" color="#4B5320" />
      </AppView>
    );
  }
  if (isError) {
    return (
      <AppView style={styles.categoriesErrorContainer}>
        {error && <AppText style={styles.categoriesErrorText}>{error.message || 'Unknown error'}</AppText>}
        <TouchableOpacity onPress={refetch}>
          <AppText style={styles.categoriesErrorRetryButton}>Retry</AppText>
        </TouchableOpacity>
      </AppView>
    );
  }
  if (categories?.length === 0) {
    return (
      <AppView style={styles.categoriesEmptyContainer}>
        <AppText style={styles.categoriesEmptyText}>No categories found</AppText>
      </AppView>
    );
  }

  return (
    <AppView style={styles.categoriesContainer}>
        <AppText style={styles.categoriesTitle}>{title}</AppText>
        <FlatList
          data={categories || []}
          renderItem={({ item }: { item: Category }) => 
          <CategoryItem category={item} />
          }
          keyExtractor={(item: Category) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </AppView>
  )
}

export default Categories

const styles = StyleSheet.create({
  categoriesErrorText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "red",
    textAlign: "center",
    lineHeight: 32,
    fontWeight: "600",
  },
  categoriesErrorRetryButton: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    textAlign: "center",
    lineHeight: 32,
    fontWeight: "600",
  },
  categoriesEmptyText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    textAlign: "center",
    lineHeight: 32,
    fontWeight: "600",
  },
    categoriesLoadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesErrorContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoriesEmptyContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryItem: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 99,
        backgroundColor: "#4B5320",
        marginHorizontal: 6,
      },
    
      categoryItemText: {
        fontSize: 12,
        fontFamily: "Poppins_600SemiBold",
        color: "#FFFFFF",
        textAlign: "center",
        lineHeight: 24,
      },
    
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
})