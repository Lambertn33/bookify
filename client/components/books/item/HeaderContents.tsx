import React from 'react';
import { AppView, AppTitle, AppText } from '@/components/ui';
import { StyleSheet } from 'react-native';

interface HeaderContentsProps {
    title: string;
    author: string;
    price: string;
}

const HeaderContents = ({title, author, price}: HeaderContentsProps) => {
  return (
    <AppView style={styles.headerContent}>
    <AppTitle style={styles.bookTitle}>{title}</AppTitle>
    <AppText style={styles.bookAuthor}>{author}</AppText>
    <AppView style={styles.bookPriceContainer}>
      <AppText style={styles.bookPriceLabel}>Price</AppText>
      <AppText style={styles.bookPrice}>${price}</AppText>
    </AppView>
  </AppView>
  )
}

export default HeaderContents

const styles = StyleSheet.create({
    headerContent: {
        paddingTop: 24,
        paddingHorizontal: 20,
    },
    bookTitle: {
        fontFamily: "Poppins_700Bold",
        color: "#000000",
        textAlign: 'center',
      },
      bookAuthor: {
        fontSize: 14,
        fontFamily: "Poppins_600SemiBold",
        color: "#000000",
        textAlign: 'center',
        opacity: 0.4,
      },
      bookPriceContainer: {
        alignItems: 'center',
        gap: 2,
        marginVertical: 10,
        justifyContent: 'center',
        width: 100,
        height: 100,
        alignSelf: 'center',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8,
        backgroundColor: '#FFFFFF',
      },
      bookPriceLabel: {
        fontSize: 14,
        fontFamily: "Poppins_700Bold",
        color: "#000000",
        textAlign: 'center',
        opacity: 0.4,
      },
      bookPrice: {
        fontSize: 18,
        fontFamily: "Poppins_700Bold",
        color: "#4B5320",
      },
});