import { ScrollView, StyleSheet, Text, Pressable, TouchableOpacity } from 'react-native'
import { AppView, AppTextInput, AppButton, AppTitle, AppText } from '../ui'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import React from 'react'

interface AuthFormProps {
  isLogin: boolean;
  loginState: any;
  registerState: any;
  showPassword: boolean;
  
  handleEmailChange: (text: string) => void;
  handlePasswordChange: (text: string) => void;
  handleConfirmPasswordChange: (text: string) => void;
  handleNamesChange: (text: string) => void;
  handleClearErrors: () => void;
  handleLogin: () => void;
  handleRegister: () => void;
  isFormValid: () => boolean;
  setIsLogin: (isLogin: boolean) => void;
  setShowPassword: (showPassword: boolean) => void;
}

const AuthForm = ({ isLogin, loginState, registerState, handleEmailChange, handlePasswordChange, handleConfirmPasswordChange, handleNamesChange, handleClearErrors, handleLogin, handleRegister, isFormValid, setIsLogin, setShowPassword, showPassword }: AuthFormProps) => {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
    <ScrollView contentContainerStyle={styles.content}>
      <AppView style={styles.header}>
        <AppTitle style={styles.title}>{isLogin ? 'Welcome Back' : 'Create  an Account'}</AppTitle>
      </AppView>

      <AppView style={styles.form}>
        {
          !isLogin && (
            <AppView>
              <AppTextInput
                placeholder="Names"
                value={registerState.names}
                handleChangeText={handleNamesChange}
                icon={<Ionicons name="person-outline" size={20} color="#666666" />}
                iconPosition="left"
                hasError={!!registerState.errors.names}
                style={styles.input}
              />
              {registerState.errors.names ? (
                <AppText style={styles.errorText}>{registerState.errors.names}</AppText>
              ) : null}
            </AppView>
          )
        }
        <AppView>
          <AppTextInput
            placeholder="Email"
            value={isLogin ? loginState.email : registerState.email}
            handleChangeText={handleEmailChange}
            icon={<Ionicons name="mail-outline" size={20} color="#666666" />}
            iconPosition="left"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            hasError={!!(isLogin ? loginState.errors.email : registerState.errors.email)}
            style={styles.input}
          />
          {(isLogin ? loginState.errors.email : registerState.errors.email) ? (
            <AppText style={styles.errorText}>
              {isLogin ? loginState.errors.email : registerState.errors.email}
            </AppText>
          ) : null}
        </AppView>

        <AppView>
          <AppView style={styles.passwordContainer}>
            <AppTextInput
              placeholder="Password"
              value={isLogin ? loginState.password : registerState.password}
              handleChangeText={handlePasswordChange}
              icon={<Ionicons name="lock-closed-outline" size={20} color="#666666" />}
              iconPosition="left"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoComplete="password"
              hasError={!!(isLogin ? loginState.errors.password : registerState.errors.password)}
              style={styles.input}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#666666"
              />
            </Pressable>
          </AppView>
          {(isLogin ? loginState.errors.password : registerState.errors.password) ? (
            <AppText style={styles.errorText}>
              {isLogin ? loginState.errors.password : registerState.errors.password}
            </AppText>
          ) : null}
        </AppView>
        {
          !isLogin && (
            <AppView>
              <AppTextInput
                placeholder="Confirm Password"
                value={registerState.confirmPassword}
                handleChangeText={handleConfirmPasswordChange}
                icon={<Ionicons name="lock-closed-outline" size={20} color="#666666" />}
                iconPosition="left"
                secureTextEntry={true}
                autoCapitalize="none"
                autoComplete="password"
                hasError={!!registerState.errors.confirmPassword}
                style={styles.input}
              />
              {registerState.errors.confirmPassword ? (
                <AppText style={styles.errorText}>{registerState.errors.confirmPassword}</AppText>
              ) : null}
            </AppView>
          )
        }

        <AppButton
        disabled={!isFormValid()}
        style={styles.loginButton} onPress={isLogin ? handleLogin : handleRegister}>
          <Text style={styles.loginButtonText}>{isLogin ? 'Sign In' : 'Sign Up'}</Text>
        </AppButton>
      </AppView>
      <AppView style={styles.switchTextContainer}>
        <AppText style={styles.switchText}>{isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}</AppText>
        <Pressable onPress={() => {
          setIsLogin(!isLogin);
          handleClearErrors();
        }}>
          <AppText style={styles.switchTextLink}>{isLogin ? 'Sign Up' : 'Sign In'}</AppText>
        </Pressable>
      </AppView>
      <TouchableOpacity onPress={() => router.push('/books/bookList')} style={styles.backButtonContainer}>
        <Ionicons name="arrow-back-outline" size={20} color="#4B5320" />
        <AppText style={styles.backButtonText}>Back to Books List</AppText>
      </TouchableOpacity>
    </ScrollView>
  </SafeAreaView>
  )
}

export default AuthForm

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
      },
      content: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingTop: 40,
        paddingBottom: 40,
        justifyContent: 'center',
      },
      header: {
        marginBottom: 32,
        alignItems: 'center',
      },
      welcomeText: {
        fontSize: 32,
        fontFamily: "Poppins_700Bold",
        color: "#000000",
        marginBottom: 12,
        textAlign: 'center',
        letterSpacing: -0.5,
      },
      title: {
        fontSize: 24,
        fontFamily: "Poppins_700Bold",
        color: "#000000",
        marginBottom: 8,
        textAlign: 'center',
        letterSpacing: -0.3,
      },
      subtitle: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: "#666666",
        textAlign: 'center',
      },
      form: {
        gap: 16,
        backgroundColor: '#FFFFFF',
        padding: 24,
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
        marginBottom: 24,
      },
      input: {
        marginBottom: 0,
      },
      errorText: {
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: "#FF3B30",
        marginTop: 4,
        marginLeft: 4,
      },
      passwordContainer: {
        position: 'relative',
        marginBottom: 0,
      },
      eyeIcon: {
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: [{ translateY: -10 }],
        zIndex: 1,
        padding: 4,
      },
      loginButton: {
        marginTop: 8,
        paddingVertical: 18,
        borderRadius: 16,
        backgroundColor: '#000000',
      },
      loginButtonText: {
        fontSize: 16,
        fontFamily: "Poppins_600SemiBold",
        color: "#FFFFFF",
        letterSpacing: 0.5,
      },
      switchTextContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
        flexWrap: 'wrap',
      },
    
      switchText: {
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        color: "#666666",
        textAlign: 'center',
      },
      switchTextLink: {
        fontSize: 14,
        fontFamily: "Poppins_600SemiBold",
        color: "#000000",
        textAlign: 'center',
        marginLeft: 4,
        textDecorationLine: 'underline',
      },
      backButtonContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 4,
      },
      backButtonText: {
        fontSize: 14,
        fontFamily: "Poppins_600SemiBold",
        color: "#4B5320",
        textDecorationLine: 'underline',
      },
})