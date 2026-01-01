import { View, ViewProps, StyleSheet } from "react-native";

interface AppViewProps extends ViewProps {
  children?: React.ReactNode;
  paddingTop?: number;
}

export default function AppView({ 
  children, 
  style, 
  paddingTop,
  ...props 
}: AppViewProps) {
  return (
    <View 
      style={[style, { paddingTop: paddingTop || 10 }]} 
      {...props}
    >
      {children}
    </View>
  );
}

