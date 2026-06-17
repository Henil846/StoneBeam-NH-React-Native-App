import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import RoleChip from '../common/RoleChip';
import Typography from '../../constants/typography';

const ProfileHeader = ({ user, style }) => {
  const { colors } = useApp();

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={[styles.container, style]}
    >
      {/* Avatar */}
      <View style={[styles.avatarOuter, { borderColor: colors.accent }]}>
        <View style={styles.avatarInner}>
          <MaterialCommunityIcons name="account" size={40} color="#FFF" />
        </View>
      </View>

      <Text style={styles.name}>{user?.name || 'User Name'}</Text>
      <RoleChip role={user?.role} size="large" style={styles.roleChip} />
      <Text style={styles.city}>
        <MaterialCommunityIcons name="map-marker" size={14} color="rgba(255,255,255,0.7)" />
        {' '}{user?.city || 'City'}
      </Text>
      <Text style={styles.memberSince}>Member since {user?.memberSince || '2024'}</Text>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.accent }]}>{user?.projectCount || 0}</Text>
          <Text style={styles.statLabel}>Projects</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.accent }]}>⭐ {user?.rating || '0.0'}</Text>
          <Text style={styles.statLabel}>Rating</Text>
        </View>
        <View style={[styles.statDivider, { backgroundColor: 'rgba(255,255,255,0.2)' }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.accent }]}>{user?.connections || 0}</Text>
          <Text style={styles.statLabel}>Connections</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  avatarOuter: {
    width: 88,
    height: 88,
    borderRadius: 44,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...Typography.sectionHeading,
    color: '#FFF',
    marginBottom: 8,
  },
  roleChip: {
    marginBottom: 8,
  },
  city: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 4,
  },
  memberSince: {
    ...Typography.caption,
    color: 'rgba(255,255,255,0.5)',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    gap: 16,
    width: '100%',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    ...Typography.cardTitle,
    fontSize: 18,
    marginBottom: 4,
  },
  statLabel: {
    ...Typography.caption,
    color: 'rgba(255,255,255,0.6)',
  },
  statDivider: {
    width: 1,
    height: 32,
  },
});

export default ProfileHeader;
