import { StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useGetMyBooks } from '@/hooks/useMyBooks'
import { AppView, AppText, AppHeader } from '@/components/ui'
import Modal from 'react-native-modal'
import {WebView} from 'react-native-webview'
import { Image } from 'expo-image'
import { useState } from 'react'

interface Book {
  id: number;
  title: string;
  cover_image_url: string;
  book_path_url: string;
}

const MyBooks = () => {
  const router = useRouter()
  const { data, isLoading, isError, error } = useGetMyBooks()
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [isPdfModalVisible, setIsPdfModalVisible] = useState(false)

  const books: Book[] = data?.books || []

  const handleBack = () => {
    router.back()
  }

  const handleOpenPdf = (book: Book) => {
    setSelectedBook(book)
    setIsPdfModalVisible(true)
  }

  const handleClosePdf = () => {
    setIsPdfModalVisible(false)
    setSelectedBook(null)
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <AppView style={styles.headerContainer}>
        <AppHeader
          title="My Books"
          leftIcon={
            <Pressable onPress={handleBack}>
              <FontAwesome5 name="arrow-left" size={24} color="black" />
            </Pressable>
          }
        />
      </AppView>

      {isLoading ? (
        <AppView style={styles.emptyContainer}>
          <ActivityIndicator size="large" color="#000000" />
          <AppText style={styles.emptyTitle}>Loading books...</AppText>
        </AppView>
      ) : isError ? (
        <AppView style={styles.emptyContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#CCCCCC" />
          <AppText style={styles.emptyTitle}>Error loading books</AppText>
          <AppText style={styles.emptyText}>{error?.message || 'Please try again later'}</AppText>
        </AppView>
      ) : books.length === 0 ? (
        <AppView style={styles.emptyContainer}>
          <Ionicons name="book-outline" size={64} color="#CCCCCC" />
          <AppText style={styles.emptyTitle}>No books yet</AppText>
          <AppText style={styles.emptyText}>Your purchased books will appear here</AppText>
        </AppView>
      ) : (
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {books.map((book) => (
            <AppView key={book.id} style={styles.bookCard}>
              <AppView style={styles.bookImageContainer}>
                <Image
                  source={{ uri: book.cover_image_url }}
                  style={styles.bookImage}
                  contentFit="cover"
                />
              </AppView>
              <AppView style={styles.bookInfoContainer}>
                <AppText style={styles.bookTitle} numberOfLines={2}>
                  {book.title}
                </AppText>
                <Pressable
                  style={styles.readButton}
                  onPress={() => handleOpenPdf(book)}
                >
                  <FontAwesome5 name="book-reader" size={16} color="#FFFFFF" />
                  <AppText style={styles.readButtonText}>Read Book</AppText>
                </Pressable>
              </AppView>
            </AppView>
          ))}
        </ScrollView>
      )}

      {/* PDF Viewer Modal */}
      <Modal
        isVisible={isPdfModalVisible}
        onBackdropPress={handleClosePdf}
        style={styles.modal}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <AppView style={styles.pdfModalContent}>
          <AppView style={styles.pdfHeader} paddingTop={20} paddingBottom={20}>
            <AppText style={styles.pdfTitle} numberOfLines={1}>
              {selectedBook?.title}
            </AppText>
            <Pressable onPress={handleClosePdf} style={styles.closeButton}>
              <FontAwesome5 name="times" size={24} color="#000000" />
            </Pressable>
          </AppView>
          {selectedBook?.book_path_url && (
            <WebView
              source={{ uri: selectedBook.book_path_url }}
              style={styles.pdf}
            />
          )}
        </AppView>
      </Modal>
    </SafeAreaView>
  )
}

export default MyBooks

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    gap: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginTop: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginTop: 8,
    textAlign: 'center',
  },
  bookCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bookImageContainer: {
    width: 100,
    height: 140,
    borderRadius: 8,
    overflow: 'hidden',
  },
  bookImage: {
    width: '100%',
    height: '100%',
  },
  bookInfoContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  bookTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 12,
  },
  readButton: {
    backgroundColor: '#000000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  readButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Poppins_600SemiBold',
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  pdfModalContent: {
    backgroundColor: '#FFFFFF',
    height: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  pdfHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  pdfTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    flex: 1,
    marginRight: 16,
  },
  closeButton: {
    padding: 4,
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
})