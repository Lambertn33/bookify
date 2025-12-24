import { View, ViewProps, StyleSheet } from "react-native";

interface AppViewProps extends ViewProps {
  children?: React.ReactNode;
}

export default function AppView({ 
  children, 
  style, 
  ...props 
}: AppViewProps) {
  return (
    <View 
      style={[styles.default, style]} 
      {...props}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  default: {
    // Default View styles - can be overridden via style prop
  },
});

