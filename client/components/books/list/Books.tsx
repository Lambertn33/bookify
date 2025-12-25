
import React from 'react'
import { AppView , AppTitle, AppText} from '@/components/ui'
import { StyleSheet, Image, FlatList } from 'react-native'

interface IBook {
  id: number;
  category: string;
  title: string;
  author: string;
  price: number;
  cover_image?: string;
}

interface IBooksProps {
  books: IBook[];
}

const BookItem = ({ book }: { book: IBook }) => {
  return (
    <AppView style={styles.bookContainer}>
      <AppView style={styles.bookInfoAndImageContainer}>
        <AppView style={styles.bookImageContainer}>
          <Image 
            width={100}
            height={100}
            source={{ uri: 'https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg' }}  />
          </AppView>
          <AppView style={styles.bookInfoContainer}>
            <AppText style={styles.bookCategory}>{book.category}</AppText>
            <AppTitle style={styles.bookTitle}>{book.title}</AppTitle>
            <AppText style={styles.bookAuthor}>{book.author}</AppText>
          </AppView>
        </AppView>
        <AppView style={styles.bookPriceContainer}>
          <AppText style={styles.bookPrice}>${book.price}</AppText>
        </AppView>
    </AppView>
  )
}

const Books = ({ books }: IBooksProps) => {
  return (
    <AppView style={styles.booksContainer}>
      <AppTitle style={styles.booksTitle}>Available Books</AppTitle>
      <FlatList
        data={books}
        renderItem={({ item }: { item: IBook }) => <BookItem book={item} />}
        keyExtractor={(item: IBook) => item.id.toString()}
      />  
    </AppView>
  )
}

const styles = StyleSheet.create({
  booksContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: 20,
  },

  booksTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    lineHeight: 32,
    fontWeight: "600",
  },

  bookContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    marginTop: 10,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: "#e6e6e6",
    borderRadius: 10,
    overflow: 'hidden',
    height: 100,
    paddingRight: 16,
  },

  bookInfoAndImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },

  bookImageContainer: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    elevation: 10,
  },
  bookInfoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 0,
  },
  bookCategory: {
    fontSize: 14,
    fontFamily: "Poppins_800ExtraBold",
    color: "#4B5320",
  },
  bookTitle: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#000000",
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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#000",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
})

export default Books