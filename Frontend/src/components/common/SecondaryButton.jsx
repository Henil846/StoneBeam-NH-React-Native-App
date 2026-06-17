import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useApp } from '../../context/AppContext';
import Typography from '../../constants/typography';

const SecondaryButton = ({ title, onPress, disabled = false, loading = false, style, textStyle, icon }) => {
  const { colors } = useApp();

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.button,
        { borderColor: colors.accent },
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.accent} size="small" />
      ) : (
        <>
          {icon && icon}
          <Text style={[styles.text, { color: colors.accent }, textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 15,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderRadius: 12,
    borderWidth: 2,
    minHeight: 52,
    backgroundColor: 'transparent',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    ...Typography.button,
  },
});

export default SecondaryButton;
