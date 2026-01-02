import React, { useCallback, useContext, useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { handleLogin, handleRegister, saveDataToLocalStorage } from "@/helpers";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { validateEmail, validatePassword, validateConfirmPassword, validateNames, validatePhone, validateAddress, validateCity, type LoginErrors, type RegisterErrors, emptyLoginErrors, emptyRegisterErrors } from "@/validations";


type LoginState = {
  email: string;
  password: string;
  errors: LoginErrors;
  apiError: string;
};

type RegisterState = {
  names: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  password: string;
  confirmPassword: string;
  errors: RegisterErrors;
};

const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginState, setLoginState] = useState<LoginState>({
    email: "",
    password: "",
    errors: emptyLoginErrors,
    apiError: "",
  });

  const [registerState, setRegisterState] = useState<RegisterState>({
    names: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
    errors: emptyRegisterErrors,
  });

  // ---------- Small state helpers ----------
  const patchLogin = useCallback((patch: Partial<LoginState>) => {
    setLoginState((prev) => ({ ...prev, ...patch }));
  }, []);

  const patchRegister = useCallback((patch: Partial<RegisterState>) => {
    setRegisterState((prev) => ({ ...prev, ...patch }));
  }, []);

  const patchLoginErrors = useCallback((patch: Partial<LoginErrors>) => {
    setLoginState((prev) => ({
      ...prev,
      errors: { ...prev.errors, ...patch },
    }));
  }, []);

  const patchRegisterErrors = useCallback((patch: Partial<RegisterErrors>) => {
    setRegisterState((prev) => ({
      ...prev,
      errors: { ...prev.errors, ...patch },
    }));
  }, []);

  // ---------- Change handlers ----------
  const handleEmailChange = useCallback(
    (text: string) => {
      const emailError = validateEmail(text);

      if (isLogin) {
        patchLogin({ email: text, apiError: "" }); // Clear API error when user types
        patchLoginErrors({ email: emailError });
      } else {
        patchRegister({ email: text });
        patchRegisterErrors({ email: emailError });
      }
    },
    [isLogin, patchLogin, patchRegister, patchLoginErrors, patchRegisterErrors, validateEmail]
  );

  const handlePasswordChange = useCallback(
    (text: string) => {
      const passwordError = validatePassword(text);

      if (isLogin) {
        patchLogin({ password: text, apiError: "" }); // Clear API error when user types
        patchLoginErrors({ password: passwordError });
        return;
      }

      // register
      setRegisterState((prev) => {
        const confirmPasswordError = prev.confirmPassword
          ? validateConfirmPassword(text, prev.confirmPassword)
          : "";

        return {
          ...prev,
          password: text,
          errors: {
            ...prev.errors,
            password: passwordError,
            confirmPassword: confirmPasswordError,
          },
        };
      });
    },
    [isLogin, patchLogin, patchLoginErrors, validatePassword, validateConfirmPassword]
  );

  const handleConfirmPasswordChange = useCallback(
    (text: string) => {
      setRegisterState((prev) => ({
        ...prev,
        confirmPassword: text,
        errors: {
          ...prev.errors,
          confirmPassword: validateConfirmPassword(prev.password, text),
        },
      }));
    },
    [validateConfirmPassword]
  );

  const handleNamesChange = useCallback(
    (text: string) => {
      const namesError = validateNames(text);
      patchRegister({ names: text });
      patchRegisterErrors({ names: namesError });
    },
    [patchRegister, patchRegisterErrors, validateNames]
  );

  const handlePhoneChange = useCallback(
    (text: string) => {
      const phoneError = validatePhone(text);
      patchRegister({ phone: text });
      patchRegisterErrors({ phone: phoneError });
    },
    [patchRegister, patchRegisterErrors, validatePhone]
  );

  const handleAddressChange = useCallback(
    (text: string) => {
      const addressError = validateAddress(text);
      patchRegister({ address: text });
      patchRegisterErrors({ address: addressError });
    },
    [patchRegister, patchRegisterErrors, validateAddress]
  );

  const handleCityChange = useCallback(
    (text: string) => {
      const cityError = validateCity(text);
      patchRegister({ city: text });
      patchRegisterErrors({ city: cityError });
    },
    [patchRegister, patchRegisterErrors, validateCity]
  );

  const handleClearErrors = useCallback(() => {
    patchLoginErrors(emptyLoginErrors);
    patchRegisterErrors(emptyRegisterErrors);
    patchLogin({ apiError: "" });
  }, [patchLoginErrors, patchRegisterErrors]);

  // ---------- Validity ----------
  const isRegisterFormValid = useCallback(() => {
    return (
      registerState.names.length > 0 &&
      !registerState.errors.names &&
      registerState.email.length > 0 &&
      !registerState.errors.email &&
      registerState.phone.length > 0 &&
      !registerState.errors.phone &&
      registerState.address.length > 0 &&
      !registerState.errors.address &&
      registerState.city.length > 0 &&
      !registerState.errors.city &&
      registerState.password.length > 0 &&
      !registerState.errors.password &&
      registerState.confirmPassword.length > 0 &&
      !registerState.errors.confirmPassword
    );
  }, [registerState]);

  const isLoginFormValid = useCallback(() => {
    return (
      loginState.email.length > 0 &&
      !loginState.errors.email &&
      loginState.password.length > 0 &&
      !loginState.errors.password
    );
  }, [loginState]);

  const isFormValid = useCallback(() => {
    return isLogin ? isLoginFormValid() : isRegisterFormValid();
  }, [isLogin, isLoginFormValid, isRegisterFormValid]);

  const router = useRouter();
  const authContext = useContext(AuthContext);

  // ---------- Actions ----------
  const handleLoginAction = useCallback(async () => {
    try {
      const response = await handleLogin(loginState.email, loginState.password);
      if (response.status !== 200) {
        patchLogin({ apiError: response.message });
      } else {
        if (response.user && response.token) {
          authContext.setUser(response.user);
          authContext.setToken(response.token);
          // Save to AsyncStorage
          await saveDataToLocalStorage(response.token, response.user);
          router.push("/(shop)/books/bookList");
        }
      }
    } catch (error: any) {
      patchLogin({ apiError: error.message });
    }
  }, [loginState.email, loginState.password, patchLogin, authContext, router]);

  const handleRegisterAction = useCallback(async () => {
    try {
      const response = await handleRegister(
        registerState.names,
        registerState.email,
        registerState.phone,
        registerState.address,
        registerState.city,
        registerState.password
      );
      if (response.status !== 200) {
        patchRegisterErrors({ email: response.message });
      } else {
        // REGISTER REDIRECT
      }
    } catch (error: any) {
      console.error("Register error:", error.message);
    }
  }, [registerState.names, registerState.email, registerState.phone, registerState.address, registerState.city, registerState.password, patchRegisterErrors]);

  return (
    <AuthForm
      isLogin={isLogin}
      loginState={loginState}
      registerState={registerState}
      showPassword={showPassword}
      handleEmailChange={handleEmailChange}
      handlePasswordChange={handlePasswordChange}
      handleConfirmPasswordChange={handleConfirmPasswordChange}
      handleNamesChange={handleNamesChange}
      handlePhoneChange={handlePhoneChange}
      handleAddressChange={handleAddressChange}
      handleCityChange={handleCityChange}
      handleClearErrors={handleClearErrors}
      handleLogin={handleLoginAction}
      handleRegister={handleRegisterAction}
      isFormValid={isFormValid}
      setIsLogin={setIsLogin}
      setShowPassword={setShowPassword}
    />
  );
};

export default AuthScreen;
