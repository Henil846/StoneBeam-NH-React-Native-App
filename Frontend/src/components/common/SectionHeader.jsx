import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../../context/AppContext';
import Typography from '../../constants/typography';

const SectionHeader = ({ title, onSeeAll, style }) => {
  const { colors } = useApp();

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
          <Text style={[styles.seeAll, { color: colors.accent }]}>See All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  title: {
    ...Typography.sectionHeading,
  },
  seeAll: {
    ...Typography.buttonSmall,
  },
});

export default SectionHeader;
