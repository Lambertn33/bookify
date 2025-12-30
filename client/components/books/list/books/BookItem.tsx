import { AppView, AppText } from '@/components/ui';
import { Pressable, StyleSheet } from 'react-native';
import { MaterialIcons, Foundation } from '@expo/vector-icons';

import { Image } from 'expo-image';
import { IBook } from './types';
import { Link } from 'expo-router';

interface BookItemProps {
  book: IBook;
}

const BookItem = ({ book }: BookItemProps) => {
  
  return (
    <Link href={`/(shop)/books/${book.id}`} style={styles.bookContainerLink}>
      <AppView style={styles.bookContainer}>
        <AppView style={styles.bookImageContainer}>
          <Image 
            source={{ uri: book.cover_image_url }}  
            style={styles.bookImage}
            contentFit="cover"
          />
        </AppView>
        <AppView style={styles.bookInfoContainer}>
          <AppView style={styles.bookCategoryContainer}>
            <MaterialIcons name="category" size={14} color="black" />
            <AppText style={styles.bookCategory} numberOfLines={1}>{book.category.name}</AppText>
          </AppView>
          <AppView style={styles.bookTitleContainer}>
            <MaterialIcons name="book-online" size={18} color="black" />
            <AppText style={styles.bookTitle} numberOfLines={1} ellipsizeMode="tail">{book.title}</AppText>
          </AppView>
          <AppView style={styles.bookAuthorContainer}>
            <MaterialIcons name="person-outline" size={18} color="black" />
            <AppText style={styles.bookAuthor} numberOfLines={1}>{book.author}</AppText>
          </AppView>
          <AppView style={styles.bookPriceContainer}>
            <Foundation name="dollar" size={18} color="black" />
            <AppText style={styles.bookPrice}>${book.price}</AppText>
          </AppView>
        </AppView>
    </AppView>
    </Link>
  );
};

const styles = StyleSheet.create({
  bookContainerLink: {
   marginBottom: 16,
   cursor: 'pointer',
  },
  bookContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    width: '100%',
    height: 140,
    paddingRight: 16,
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    overflow: 'hidden',
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
    width: 140,
    height: 140,
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
    justifyContent: 'space-between',
    flex: 1,
    minWidth: 0,
  },
  bookCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginVertical: 0,
  },
  bookCategory: {
    fontSize: 12,
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
    color: "red",
  },
  bookTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginVertical: 0,
  },
  bookAuthorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginVertical: 0,
  },
  bookPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginVertical: 0,
  },
});

export default BookItem;

