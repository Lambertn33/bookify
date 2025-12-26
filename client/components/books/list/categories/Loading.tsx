import React from 'react';
import { AppView } from '@/components/ui';
import { StyleSheet, ActivityIndicator } from 'react-native';

const Loading = () => {
  return (
    <AppView style={styles.container}>
      <ActivityIndicator size="small" color="#4B5320" />
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
});

export default Loading;

