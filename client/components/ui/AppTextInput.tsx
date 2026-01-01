import { StyleSheet, TextInput, TextInputProps, ViewStyle, TextStyle } from 'react-native'
import  AppView  from './AppView';
import React from 'react';

interface AppTextInputProps extends Omit<TextInputProps, 'style'> {
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  style?: ViewStyle;
  inputStyle?: TextStyle;
  value: string;
  hasError?: boolean;
  handleChangeText: (text: string) => void;
}
  
export default function AppTextInput({ placeholder, value, handleChangeText, icon, iconPosition = 'left', style, inputStyle, hasError = false, ...props }: AppTextInputProps) {
  return (
    <AppView style={[styles.container, style, hasError && styles.errorContainer]} paddingBottom={12} paddingTop={12}>
      {icon && iconPosition === 'left' && icon}
      <TextInput 
        placeholder={placeholder}
        value={value}
        onChangeText={(text) => handleChangeText(text)}
        style={[styles.input, inputStyle]}
        placeholderTextColor="#999999"
        {...props}
        />
      {icon && iconPosition === 'right' && icon}
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#e6e6e6",
    paddingHorizontal: 20,
    borderRadius: 99,
    paddingVertical: 16,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    opacity: 0.4,
    lineHeight: 24,
    marginBottom: 6,
  },
  errorContainer: {
    borderWidth: 1,
    borderColor: "#FF3B30",
  },
});