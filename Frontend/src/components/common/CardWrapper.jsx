import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../../context/AppContext';

const CardWrapper = ({ children, style, showAccentBar = true, noPadding = false }) => {
  const { colors } = useApp();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.card },
        noPadding ? null : styles.padding,
        style,
      ]}
    >
      {showAccentBar && (
        <LinearGradient
          colors={[colors.accent, colors.accentLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.accentBar}
        />
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginBottom: 12,
  },
  padding: {
    padding: 16,
  },
  accentBar: {
    height: 4,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default CardWrapper;
