import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import PrimaryButton from './PrimaryButton';
import Typography from '../../constants/typography';

const EmptyState = ({ icon = 'folder-open-outline', title, message, ctaLabel, onCta, style }) => {
  const { colors } = useApp();

  return (
    <View style={[styles.container, style]}>
      <View style={[styles.iconCircle, { backgroundColor: colors.accentTint }]}>
        <MaterialCommunityIcons name={icon} size={48} color={colors.accent} />
      </View>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title || 'Nothing here yet'}</Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>
        {message || 'Check back later or try a different search.'}
      </Text>
      {ctaLabel && onCta && (
        <PrimaryButton title={ctaLabel} onPress={onCta} style={styles.cta} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    flex: 1,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    ...Typography.sectionHeading,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    ...Typography.body,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 22,
  },
  cta: {
    marginTop: 24,
  },
});

export default EmptyState;
