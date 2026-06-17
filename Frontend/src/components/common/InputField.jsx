import React, { useRef, useEffect, useState } from 'react';
import { View, TextInput, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import Typography from '../../constants/typography';

const InputField = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  secureTextEntry = false,
  multiline = false,
  maxLength,
  returnKeyType = 'next',
  onSubmitEditing,
  blurOnSubmit = false,
  editable = true,
  leftIcon,
  error,
  style,
  inputRef,
  numberOfLines = 1,
}) => {
  const { colors } = useApp();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const animatedLabel = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedLabel, {
      toValue: isFocused || value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelTop = animatedLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [16, -8],
  });

  const labelSize = animatedLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 12],
  });

  const borderColor = error
    ? colors.error
    : isFocused
    ? colors.accent
    : colors.border;

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.inputWrapper,
          {
            backgroundColor: colors.inputBackground,
            borderColor,
            borderWidth: isFocused ? 2 : 1,
          },
        ]}
      >
        {leftIcon && (
          <MaterialCommunityIcons
            name={leftIcon}
            size={20}
            color={isFocused ? colors.accent : colors.textSecondary}
            style={styles.leftIcon}
          />
        )}
        <View style={styles.inputContainer}>
          <Animated.Text
            style={[
              styles.label,
              {
                top: labelTop,
                fontSize: labelSize,
                color: isFocused ? colors.accent : colors.textSecondary,
                backgroundColor: colors.inputBackground,
              },
            ]}
          >
            {label}
          </Animated.Text>
          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={onChangeText}
            placeholder={isFocused ? placeholder : ''}
            placeholderTextColor={colors.textSecondary}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry && !showPassword}
            multiline={multiline}
            maxLength={maxLength}
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            blurOnSubmit={blurOnSubmit}
            editable={editable}
            numberOfLines={numberOfLines}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            style={[
              styles.input,
              {
                color: colors.textPrimary,
                minHeight: multiline ? 80 : 48,
                textAlignVertical: multiline ? 'top' : 'center',
              },
            ]}
          />
        </View>
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={22}
              color={colors.textSecondary}
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={[styles.error, { color: colors.error }]}>{error}</Text>}
      {maxLength && value && (
        <Text style={[styles.charCount, { color: colors.textSecondary }]}>
          {value.length}/{maxLength}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  leftIcon: {
    marginRight: 12,
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
  },
  label: {
    position: 'absolute',
    left: 0,
    paddingHorizontal: 4,
    zIndex: 1,
    fontWeight: '500',
  },
  input: {
    ...Typography.body,
    paddingVertical: 14,
    paddingHorizontal: 0,
  },
  eyeIcon: {
    padding: 8,
    marginLeft: 4,
  },
  error: {
    ...Typography.caption,
    marginTop: 4,
    marginLeft: 4,
  },
  charCount: {
    ...Typography.caption,
    textAlign: 'right',
    marginTop: 4,
  },
});

export default InputField;
