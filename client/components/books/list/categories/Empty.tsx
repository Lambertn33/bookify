import React from 'react';
import { AppView, AppText } from '@/components/ui';
import { StyleSheet } from 'react-native';

const Empty = () => {
  return (
    <AppView style={styles.container}>
      <AppText style={styles.emptyText}>No categories found</AppText>
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
  },
});

export default Empty;





