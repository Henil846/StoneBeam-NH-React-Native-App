import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useApp } from '../../context/AppContext';

const StoneBeamLogo = ({ size = 'medium', showTagline = false, style }) => {
  const { colors } = useApp();

  const sizes = {
    small: { fontSize: 22, tagline: 11 },
    medium: { fontSize: 32, tagline: 14 },
    large: { fontSize: 42, tagline: 16 },
  };

  const s = sizes[size] || sizes.medium;

  return (
    <View style={[styles.container, style]}>
      <View style={styles.wordmark}>
        <Text style={[styles.stone, { fontSize: s.fontSize, color: colors.textOnDark }]}>
          Stone
        </Text>
        <Text style={[styles.beam, { fontSize: s.fontSize, color: colors.accent }]}>
          Beam-NH
        </Text>
      </View>
      {showTagline && (
        <Text style={[styles.tagline, { fontSize: s.tagline, color: colors.textOnDark }]}>
          Build Smarter. Connect Better.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  wordmark: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stone: {
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  beam: {
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  tagline: {
    marginTop: 8,
    opacity: 0.7,
    fontWeight: '400',
    letterSpacing: 0.5,
  },
});

export default StoneBeamLogo;
