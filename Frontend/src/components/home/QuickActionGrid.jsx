import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import Typography from '../../constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const QuickActionGrid = ({ actions, onPress, style }) => {
  const { colors } = useApp();
  const itemWidth = (SCREEN_WIDTH - 64) / 2;

  return (
    <View style={[styles.grid, style]}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          activeOpacity={0.7}
          onPress={() => onPress(action.screen)}
          style={[
            styles.item,
            {
              backgroundColor: colors.card,
              width: itemWidth,
            },
          ]}
        >
          <View style={[styles.iconCircle, { backgroundColor: colors.accentTint }]}>
            <MaterialCommunityIcons name={action.icon} size={28} color={colors.accent} />
          </View>
          <Text style={[styles.label, { color: colors.textPrimary }]} numberOfLines={2}>
            {action.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  item: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRadius: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  label: {
    ...Typography.caption,
    textAlign: 'center',
    fontWeight: '600',
  },
});

export default QuickActionGrid;
