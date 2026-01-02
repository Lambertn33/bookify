import { StyleSheet } from 'react-native';
import React from 'react';
import { AppView, AppText } from '../ui';
import { Ionicons } from '@expo/vector-icons';

interface ClientInfoProps {
  balance?: number;
  address?: string;
  city?: string;
  phone?: string;
}

const ClientInfo = ({ balance, address, city, phone }: ClientInfoProps) => {
  const hasInfo = balance !== undefined || address || city || phone;

  if (!hasInfo) {
    return null;
  }

  return (
    <AppView style={styles.container}>      
      <AppView style={styles.infoCard} paddingTop={16} paddingBottom={16}>
        {balance !== undefined && (
          <AppView style={styles.infoRow}>
            <AppView style={styles.infoIconContainer}>
              <Ionicons name="wallet-outline" size={20} color="#000000" />
            </AppView>
            <AppView style={styles.infoContent}>
              <AppText style={styles.infoLabel}>Balance</AppText>
              <AppText style={styles.infoValue}>${Number(balance).toFixed(2)}</AppText>
            </AppView>
          </AppView>
        )}

        {phone && (
          <AppView style={styles.infoRow}>
            <AppView style={styles.infoIconContainer}>
              <Ionicons name="call-outline" size={20} color="#000000" />
            </AppView>
            <AppView style={styles.infoContent}>
              <AppText style={styles.infoLabel}>Phone</AppText>
              <AppText style={styles.infoValue}>{phone}</AppText>
            </AppView>
          </AppView>
        )}

        {address && (
          <AppView style={styles.infoRow}>
            <AppView style={styles.infoIconContainer}>
              <Ionicons name="location-outline" size={20} color="#000000" />
            </AppView>
            <AppView style={styles.infoContent}>
              <AppText style={styles.infoLabel}>Address</AppText>
              <AppText style={styles.infoValue}>{address}</AppText>
            </AppView>
          </AppView>
        )}

        {city && (
          <AppView style={styles.infoRow}>
            <AppView style={styles.infoIconContainer}>
              <Ionicons name="business-outline" size={20} color="#000000" />
            </AppView>
            <AppView style={styles.infoContent}>
              <AppText style={styles.infoLabel}>City</AppText>
              <AppText style={styles.infoValue}>{city}</AppText>
            </AppView>
          </AppView>
        )}
      </AppView>
    </AppView>
  );
};

export default ClientInfo;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#000000',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    gap: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 13,
    fontFamily: 'Poppins_400Regular',
    color: '#666666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 15,
    fontFamily: 'Poppins_500Medium',
    color: '#000000',
  },
});

