import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../common/StatusBadge';
import Typography from '../../constants/typography';

const FEED_ICONS = {
  update: 'update',
  bid: 'gavel',
  order: 'truck-delivery',
  join: 'account-plus',
  payment: 'cash-check',
};

const FeedCard = ({ item, onPress, style }) => {
  const { colors } = useApp();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.card, { backgroundColor: colors.card }, style]}
    >
      <View style={[styles.iconBox, { backgroundColor: colors.accentTint }]}>
        <MaterialCommunityIcons
          name={FEED_ICONS[item.type] || 'information'}
          size={24}
          color={colors.accent}
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={[styles.project, { color: colors.textSecondary }]} numberOfLines={1}>
          {item.project}
        </Text>
        <Text style={[styles.time, { color: colors.textSecondary }]}>{item.timeAgo}</Text>
      </View>
      <StatusBadge status={item.status} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    gap: 12,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...Typography.cardTitle,
    fontSize: 14,
  },
  project: {
    ...Typography.caption,
  },
  time: {
    fontSize: 11,
    marginTop: 2,
  },
});

export default FeedCard;
