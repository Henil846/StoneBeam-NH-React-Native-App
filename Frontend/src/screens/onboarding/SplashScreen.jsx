import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { useApp } from '../../context/AppContext';
import StoneBeamLogo from '../../components/common/StoneBeamLogo';

const SplashScreen = ({ navigation }) => {
  const { colors, isAuthenticated, selectedRole, isLoading } = useApp();

  const scale = useSharedValue(0.5);
  const opacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate logo
    scale.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.back(1.2)) });
    opacity.value = withTiming(1, { duration: 600 });
    taglineOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));

    // Auto-navigate after 2.5 seconds
    const timer = setTimeout(() => {
      if (!isLoading) {
        if (isAuthenticated && selectedRole) {
          navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
        } else {
          navigation.reset({ index: 0, routes: [{ name: 'RoleSelection' }] });
        }
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated, selectedRole]);

  const logoAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const taglineAnimStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={styles.container}
    >
      <Animated.View style={[styles.logoContainer, logoAnimStyle]}>
        <View style={styles.iconWrapper}>
          <View style={styles.brickRow}>
            <View style={[styles.brick, { backgroundColor: colors.accent }]} />
            <View style={[styles.brick, { backgroundColor: colors.accentLight }]} />
          </View>
          <View style={[styles.brickRow, { marginLeft: 8 }]}>
            <View style={[styles.brick, { backgroundColor: colors.accentLight }]} />
            <View style={[styles.brick, { backgroundColor: colors.accent }]} />
          </View>
        </View>
        <StoneBeamLogo size="large" />
      </Animated.View>

      <Animated.View style={taglineAnimStyle}>
        <Animated.Text style={styles.tagline}>
          Build Smarter. Connect Better.
        </Animated.Text>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  iconWrapper: {
    marginBottom: 16,
    gap: 4,
  },
  brickRow: {
    flexDirection: 'row',
    gap: 4,
  },
  brick: {
    width: 28,
    height: 18,
    borderRadius: 4,
  },
  tagline: {
    color: '#FFFFFF',
    opacity: 0.7,
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
});

export default SplashScreen;
