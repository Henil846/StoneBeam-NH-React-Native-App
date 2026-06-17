import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useApp } from '../../context/AppContext';

const SkeletonCard = ({ width = '100%', height = 120, style, rows = 0 }) => {
  const { colors } = useApp();
  const animValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(animValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  const backgroundColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.skeleton, colors.skeletonHighlight],
  });

  if (rows > 0) {
    return (
      <View style={[styles.rowContainer, style]}>
        {Array.from({ length: rows }, (_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.row,
              {
                backgroundColor,
                width: i === rows - 1 ? '60%' : '100%',
              },
            ]}
          />
        ))}
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.card,
        {
          backgroundColor,
          width,
          height,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginBottom: 12,
  },
  rowContainer: {
    marginBottom: 12,
    gap: 8,
  },
  row: {
    height: 14,
    borderRadius: 7,
  },
});

export default SkeletonCard;
