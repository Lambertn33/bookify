// Validation error types
export type LoginErrors = { email: string; password: string };
export type RegisterErrors = {
  names: string;
  email: string;
  password: string;
  confirmPassword: string;
};

// Empty error objects
export const emptyLoginErrors: LoginErrors = { email: "", password: "" };
export const emptyRegisterErrors: RegisterErrors = {
  names: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Validation functions
export const validateEmail = (email: string): string => {
  if (!email) return "Email is required";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) ? "" : "Please enter a valid email address";
};

export const validatePassword = (password: string): string => {
  if (!password) return "Password is required";
  return password.length >= 8 ? "" : "Password must be at least 8 characters";
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string => {
  if (!confirmPassword) return "Please confirm your password";
  return password === confirmPassword ? "" : "Passwords do not match";
};

export const validateNames = (names: string): string => {
  if (!names) return "Name is required";
  return names.trim().length >= 2 ? "" : "Name must be at least 2 characters";
};

