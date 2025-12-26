import React from 'react';
import { AppView, AppTitle, AppText } from '@/components/ui';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { IBook } from './types';

interface BookItemProps {
  book: IBook;
}

const BookItem = ({ book }: BookItemProps) => {
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
  );
};

const styles = StyleSheet.create({
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
});

export default BookItem;

