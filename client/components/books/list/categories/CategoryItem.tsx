import React from 'react';
import { AppView, AppText } from '@/components/ui';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Category } from './types';

interface CategoryItemProps {
  category: Category;
  onPress?: () => void;
}

const CategoryItem = ({ category, onPress }: CategoryItemProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <AppView style={styles.categoryItem}>
        <AppText style={styles.categoryItemText}>{category.name}</AppText>
      </AppView>
    </TouchableOpacity>
  );
};

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
});

export default CategoryItem;

