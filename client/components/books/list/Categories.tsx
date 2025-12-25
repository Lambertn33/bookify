import { FlatList, StyleSheet } from 'react-native'
import { AppText, AppView } from '@/components/ui'

interface Category {
    id: number;
    name: string;
}

interface CategoriesProps {
    categories: Category[];
    title: string;
}

const CategoryItem = ({ category }: { category: Category }) => {
  return (
    <AppView style={styles.categoryItem}>
      <AppText style={styles.categoryItemText}>{category.name}</AppText>
    </AppView>
  );
};

const Categories = ({ categories, title }: CategoriesProps) => {
  return (
    <AppView style={styles.categoriesContainer}>
        <AppText style={styles.categoriesTitle}>{title}</AppText>
        <FlatList
          data={categories}
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
        marginTop: 20,
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