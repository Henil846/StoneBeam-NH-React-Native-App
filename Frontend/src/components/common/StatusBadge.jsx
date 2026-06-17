import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../../context/AppContext';

const STATUS_STYLES = {
  Open: { bg: 'transparent', text: '#2ecc71' },
  'In Progress': { bg: 'transparent', text: '#3498db' },
  Closed: { bg: 'transparent', text: '#b0b0b0' },
  Completed: { bg: 'transparent', text: '#2ecc71' },
  Pending: { bg: 'transparent', text: '#f39c12' },
  Delivered: { bg: 'transparent', text: '#2ecc71' },
  Cancelled: { bg: 'transparent', text: '#e74c3c' },
  Active: { bg: 'transparent', text: '#3498db' },
  Present: { bg: 'transparent', text: '#2ecc71' },
  Absent: { bg: 'transparent', text: '#e74c3c' },
  'Half Day': { bg: 'transparent', text: '#f39c12' },
  High: { bg: 'transparent', text: '#e74c3c' },
  Medium: { bg: 'transparent', text: '#f39c12' },
  Low: { bg: 'transparent', text: '#2ecc71' },
};

const StatusBadge = ({ status, size = 'small', style }) => {
  const statusStyle = STATUS_STYLES[status] || { bg: 'transparent', text: '#b0b0b0' };
  const isLarge = size === 'large';

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: statusStyle.bg,
          paddingVertical: isLarge ? 6 : 3,
          paddingHorizontal: isLarge ? 12 : 8,
        },
        style,
      ]}
    >
      <View style={[styles.dot, { backgroundColor: statusStyle.text }]} />
      <Text
        style={[
          styles.text,
          {
            color: statusStyle.text,
            fontSize: isLarge ? 13 : 11,
          },
        ]}
      >
        {status}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    gap: 5,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontWeight: '600',
  },
});

export default StatusBadge;
