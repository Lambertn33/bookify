import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { AppText, AppTextInput, AppTitle, AppView } from '@/components/ui'
import { Octicons } from '@expo/vector-icons'

interface SearchProps {
    title: string;
    text: string;
    placeholder: string;
}

const Search = ({ title, text, placeholder }: SearchProps) => {
    const [searchValue, setSearchValue] = useState('');
    const handleChangeText = (text: string) => setSearchValue(text);
  return (
    <AppView style={styles.searchContainer}>
    <AppTitle style={styles.searchTitle}>{title}</AppTitle>
    <AppText style={styles.searchText}>{text}</AppText>
    <AppTextInput style={styles.searchInput} placeholder={placeholder} value={searchValue} handleChangeText={handleChangeText} 
      icon={<Octicons name="search" size={20} color="#999999" />}
      iconPosition="left"
      />
  </AppView>
  )
}

export default Search

const styles = StyleSheet.create({
    searchContainer: {
        marginTop: 40,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
      },
    
      searchTitle: {
        fontSize: 18,
        fontFamily: "Poppins_600SemiBold",
        color: "#000000",
        textAlign: "center",
        lineHeight: 32,
        fontWeight: "600",
      },
    
      searchText: {
        fontSize: 14,
        fontFamily: "Poppins_700Bold",
        color: "#000000",
        textAlign: "center",
        opacity: 0.2,
        lineHeight: 24,
      },
    
      searchInput: {
        marginTop: 20,
      },
})