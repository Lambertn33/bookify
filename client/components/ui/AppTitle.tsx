import { Text, TextProps, StyleSheet } from "react-native";

interface AppTitleProps extends TextProps {
  children?: React.ReactNode;
}

export default function AppTitle({ 
  children, 
  style, 
  ...props 
}: AppTitleProps) {
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
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    textAlign: "center",
    lineHeight: 32,
    fontWeight: "600",
  },
});

