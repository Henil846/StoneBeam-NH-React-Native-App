import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../../context/AppContext';
import Typography from '../../constants/typography';

const PrimaryButton = ({ title, onPress, disabled = false, loading = false, style, textStyle, icon }) => {
  const { colors } = useApp();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[styles.wrapper, style]}
    >
      <LinearGradient
        colors={disabled ? ['#9CA3AF', '#9CA3AF'] : [colors.accent, colors.accentLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.gradient, disabled && styles.disabled]}
      >
        {loading ? (
          <ActivityIndicator color="#FFF" size="small" />
        ) : (
          <>
            {icon && icon}
            <Text style={[styles.text, textStyle]}>{title}</Text>
          </>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#7b2cbf',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  gradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    minHeight: 52,
  },
  disabled: {
    opacity: 0.6,
  },
  text: {
    color: '#FFFFFF',
    ...Typography.button,
  },
});

export default PrimaryButton;
