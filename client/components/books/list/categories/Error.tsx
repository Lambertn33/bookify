import React from 'react';
import { AppView, AppText } from '@/components/ui';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface ErrorProps {
  error?: Error | null;
  onRetry?: () => void;
}

const Error = ({ error, onRetry }: ErrorProps) => {
  return (
    <AppView style={styles.container}>
      {error && <AppText style={styles.errorText}>{error.message || 'Unknown error'}</AppText>}
      {onRetry && (
        <TouchableOpacity onPress={onRetry}>
          <AppText style={styles.retryButton}>Retry</AppText>
        </TouchableOpacity>
      )}
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  errorText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "red",
    textAlign: "center",
    lineHeight: 32,
    fontWeight: "600",
    marginBottom: 10,
  },
  retryButton: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
    textAlign: "center",
    lineHeight: 32,
    fontWeight: "600",
  },
});

export default Error;



