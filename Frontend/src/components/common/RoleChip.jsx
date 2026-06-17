import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import { ROLE_CONFIG } from '../../constants/roles';
import Typography from '../../constants/typography';

const RoleChip = ({ role, size = 'small', style }) => {
  const { colors } = useApp();
  const config = ROLE_CONFIG[role];

  if (!config) return null;

  const isLarge = size === 'large';

  return (
    <View
      style={[
        styles.chip,
        {
          backgroundColor: colors.accentTint,
          paddingVertical: isLarge ? 8 : 4,
          paddingHorizontal: isLarge ? 14 : 10,
        },
        style,
      ]}
    >
      <MaterialCommunityIcons
        name={config.icon}
        size={isLarge ? 18 : 14}
        color={colors.accent}
      />
      <Text
        style={[
          styles.label,
          {
            color: colors.accent,
            fontSize: isLarge ? 14 : 12,
          },
        ]}
      >
        {config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 50,
  },
  label: {
    fontWeight: '600',
  },
});

export default RoleChip;
