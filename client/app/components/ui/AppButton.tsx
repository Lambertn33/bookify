import { Pressable, PressableProps, StyleSheet } from "react-native";

interface AppButtonProps extends PressableProps {
  children?: React.ReactNode;
  disabled?: boolean;
}

export default function AppButton({
  children,
  style,
  disabled = false,
  ...props
}: AppButtonProps) {
  return (
    <Pressable
      disabled={disabled}
      style={(state) => [
        styles.default,
        state.pressed && styles.pressed,
        disabled && styles.disabled,
        typeof style === "function" ? style(state) : style,
      ]}
      {...props}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  default: {
    backgroundColor: "#000000",
    paddingVertical: 16,
    paddingHorizontal: 4,
    borderRadius: 99,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.5,
  },
});

