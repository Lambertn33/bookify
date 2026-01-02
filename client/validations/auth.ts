// Validation error types
export type LoginErrors = { email: string; password: string };
export type RegisterErrors = {
  names: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  password: string;
  confirmPassword: string;
};

// Empty error objects
export const emptyLoginErrors: LoginErrors = { email: "", password: "" };
export const emptyRegisterErrors: RegisterErrors = {
  names: "",
  email: "",
  phone: "",
  address: "",
  city: "",
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

export const validatePhone = (phone: string): string => {
  if (!phone) return "Phone number is required";
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/;
  return phoneRegex.test(phone) ? "" : "Please enter a valid phone number";
};

export const validateAddress = (address: string): string => {
  if (!address) return "Address is required";
  return address.trim().length >= 5 ? "" : "Address must be at least 5 characters";
};

export const validateCity = (city: string): string => {
  if (!city) return "City is required";
  return city.trim().length >= 2 ? "" : "City must be at least 2 characters";
};

