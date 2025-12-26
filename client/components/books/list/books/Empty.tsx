import React from 'react';
import { AppView, AppText } from '@/components/ui';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface EmptyProps {
  onRetry?: () => void;
}

const Empty = ({ onRetry }: EmptyProps) => {
  return (
    <AppView style={styles.container}>
      <AppText style={styles.emptyText}>No books found</AppText>
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
  emptyText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#000000",
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

export default Empty;

