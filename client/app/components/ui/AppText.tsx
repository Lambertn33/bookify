import { Text, TextProps, StyleSheet } from "react-native";

interface AppTextProps extends TextProps {
  children?: React.ReactNode;
}

export default function AppText({ 
  children, 
  style, 
  ...props 
}: AppTextProps) {
  return (
    <Text 
      style={[styles.default, style]} 
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  default: {
    fontFamily: "Poppins_400Regular",
    fontSize: 16,
    color: "#000000",
    lineHeight: 24,
  },
});

