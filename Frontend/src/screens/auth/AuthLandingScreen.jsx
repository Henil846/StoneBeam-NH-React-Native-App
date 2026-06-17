import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import PrimaryButton from '../../components/common/PrimaryButton';
import SecondaryButton from '../../components/common/SecondaryButton';
import RoleChip from '../../components/common/RoleChip';
import Typography from '../../constants/typography';

const AuthLandingScreen = ({ navigation }) => {
  const { colors, selectedRole, roleConfig } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={styles.container}
    >
      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backBtn, { top: insets.top + 10 }]}
        onPress={() => navigation.goBack()}
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
      </TouchableOpacity>

      {/* Geometric Pattern Background */}
      <View style={styles.patternContainer}>
        {Array.from({ length: 6 }, (_, i) => (
          <View
            key={i}
            style={[
              styles.gridLine,
              { top: 80 + i * 60, opacity: 0.04 },
            ]}
          />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <View
            key={`v_${i}`}
            style={[
              styles.gridLineV,
              { left: 40 + i * 80, opacity: 0.04 },
            ]}
          />
        ))}
      </View>

      {/* Content */}
      <View style={styles.content}>
        {/* Role Icon */}
        <Animated.View entering={FadeInDown.delay(200).duration(500)} style={styles.iconSection}>
          <View style={[styles.roleIconCircle, { backgroundColor: colors.accent + '30' }]}>
            <View style={[styles.roleIconInner, { backgroundColor: colors.accent }]}>
              <MaterialCommunityIcons
                name={roleConfig?.icon || 'account'}
                size={48}
                color="#FFF"
              />
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(500)}>
          <Text style={styles.welcome}>Welcome, {roleConfig?.label || 'User'}!</Text>
          <Text style={styles.subtitle}>
            Join thousands of construction professionals on StoneBeam-NH
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.buttonGroup}>
          <PrimaryButton
            title="Create Account"
            onPress={() => navigation.navigate('Register')}
            style={styles.btn}
          />
          <SecondaryButton
            title="Sign In"
            onPress={() => navigation.navigate('SignIn')}
            style={[styles.btn, { borderColor: '#FFF' }]}
            textStyle={{ color: '#FFF' }}
          />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(800).duration(500)}>
          <Text style={styles.terms}>
            By continuing, you agree to our{' '}
            <Text style={styles.link}>Terms</Text> &{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
    padding: 8,
  },
  patternContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: '#FFF',
  },
  gridLineV: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: '#FFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  iconSection: {
    marginBottom: 32,
  },
  roleIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  roleIconInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcome: {
    ...Typography.hero,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.75)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
  },
  buttonGroup: {
    width: '100%',
    gap: 14,
    marginBottom: 32,
  },
  btn: {
    width: '100%',
  },
  terms: {
    ...Typography.caption,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    lineHeight: 18,
  },
  link: {
    color: 'rgba(255,255,255,0.8)',
    textDecorationLine: 'underline',
  },
});

export default AuthLandingScreen;
