import React, { useCallback, useContext, useState } from "react";
import AuthForm from "@/components/auth/AuthForm";
import { handleLogin, handleRegister, saveDataToLocalStorage } from "@/helpers";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";
import { validateEmail, validatePassword, validateConfirmPassword, validateNames, type LoginErrors, type RegisterErrors, emptyLoginErrors, emptyRegisterErrors } from "@/validations";


type LoginState = {
  email: string;
  password: string;
  errors: LoginErrors;
};

type RegisterState = {
  names: string;
  email: string;
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
  });

  const [registerState, setRegisterState] = useState<RegisterState>({
    names: "",
    email: "",
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
        patchLogin({ email: text });
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
        patchLogin({ password: text });
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

  const handleClearErrors = useCallback(() => {
    patchLoginErrors(emptyLoginErrors);
    patchRegisterErrors(emptyRegisterErrors);
  }, [patchLoginErrors, patchRegisterErrors]);

  // ---------- Validity ----------
  const isRegisterFormValid = useCallback(() => {
    return (
      registerState.names.length > 0 &&
      !registerState.errors.names &&
      registerState.email.length > 0 &&
      !registerState.errors.email &&
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
        patchLoginErrors({ email: response.message });
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
      patchLoginErrors({ email: error.message});
    }
  }, [loginState.email, loginState.password, patchLoginErrors, authContext, router]);

  const handleRegisterAction = useCallback(async () => {
    try {
      const response = await handleRegister(registerState.names, registerState.email, registerState.password);
      console.log("Register response:", response);
      if (response.status !== 200) {
        patchRegisterErrors({ email: response.message });
      } else {
        // REGISTER REDIRECT
      }
    } catch (error: any) {
      console.error("Register error:", error.message);
    }
  }, [registerState.names, registerState.email, registerState.password, patchRegisterErrors]);

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
