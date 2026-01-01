import { View, ViewProps, StyleSheet } from "react-native";

interface AppViewProps extends ViewProps {
  children?: React.ReactNode;
  paddingTop?: number;
  paddingBottom?: number;
}

export default function AppView({ 
  children, 
  style, 
  paddingTop,
  paddingBottom,
  ...props 
}: AppViewProps) {
  return (
    <View 
      style={[style, { paddingTop: paddingTop || 0, paddingBottom: paddingBottom || 0 }]} 
      {...props}
    >
      {children}
    </View>
  );
}

