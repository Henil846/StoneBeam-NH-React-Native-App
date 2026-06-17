import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useApp } from '../../context/AppContext';
import InputField from '../../components/common/InputField';
import PrimaryButton from '../../components/common/PrimaryButton';
import Typography from '../../constants/typography';
import { authAPI } from '../../services/api';

const SignInScreen = ({ navigation }) => {
  const { colors, loginUser } = useApp();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const [form, setForm] = useState({
    identifier: '',
    password: '',
  });

  const handleSignIn = async () => {
    if (!form.identifier.trim() || !form.password.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please enter your email/phone and password.',
      });
      return;
    }

    setLoading(true);
    try {
      await loginUser(form.identifier.trim(), form.password);
      Toast.show({
        type: 'success',
        text1: 'Welcome back!',
        text2: 'Successfully signed in to StoneBeam-NH.',
      });
      navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Sign In Failed',
        text2: error.message || 'Invalid credentials. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!forgotEmail.trim()) return;
    try {
      await authAPI.forgotPassword(forgotEmail.trim());
      setShowForgotModal(false);
      Toast.show({
        type: 'success',
        text1: 'OTP Sent!',
        text2: 'Check your phone or email for the reset code.',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message || 'Could not send OTP.',
      });
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.container, { backgroundColor: colors.surface }]}>
        {/* Header */}
        <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Sign In</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          {/* Logo */}
          <View style={styles.logoSection}>
            <View style={[styles.logoIcon, { backgroundColor: colors.accentTint }]}>
              <MaterialCommunityIcons name="shield-check" size={40} color={colors.accent} />
            </View>
            <Text style={[styles.title, { color: colors.textPrimary }]}>Welcome Back</Text>
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              Sign in to continue building
            </Text>
          </View>

          {/* Form */}
          <InputField
            label="Phone Number or Email"
            value={form.identifier}
            onChangeText={(v) => setForm({ ...form, identifier: v })}
            leftIcon="account-outline"
            keyboardType="email-address"
            returnKeyType="next"
          />

          <InputField
            label="Password"
            value={form.password}
            onChangeText={(v) => setForm({ ...form, password: v })}
            secureTextEntry
            leftIcon="lock-outline"
            returnKeyType="done"
            blurOnSubmit
          />

          <TouchableOpacity
            onPress={() => setShowForgotModal(true)}
            style={styles.forgotLink}
          >
            <Text style={[styles.forgotText, { color: colors.accent }]}>Forgot Password?</Text>
          </TouchableOpacity>

          <PrimaryButton
            title="Sign In"
            onPress={handleSignIn}
            loading={loading}
            style={styles.signInBtn}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={styles.switchLink}
          >
            <Text style={[styles.switchText, { color: colors.textSecondary }]}>
              New to StoneBeam-NH?{' '}
              <Text style={{ color: colors.accent, fontWeight: '600' }}>Create Account</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Forgot Password Modal */}
        <Modal
          visible={showForgotModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowForgotModal(false)}
        >
          <TouchableOpacity
            style={styles.modalBackdrop}
            activeOpacity={1}
            onPress={() => setShowForgotModal(false)}
          >
            <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Reset Password</Text>
              <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
                Enter your phone or email to receive an OTP
              </Text>
              <InputField
                label="Phone or Email"
                value={forgotEmail}
                onChangeText={setForgotEmail}
                leftIcon="email-outline"
              />
              <PrimaryButton
                title="Send OTP"
                onPress={handleForgotPassword}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  backBtn: {
    padding: 8,
  },
  headerTitle: {
    ...Typography.cardTitle,
    fontSize: 18,
  },
  content: {
    flex: 1,
    padding: 24,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 20,
  },
  logoIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  title: {
    ...Typography.sectionHeading,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
  },
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: 24,
    marginTop: -8,
  },
  forgotText: {
    ...Typography.buttonSmall,
  },
  signInBtn: {
    marginBottom: 8,
  },
  switchLink: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  switchText: {
    ...Typography.body,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  modalCard: {
    width: '100%',
    borderRadius: 20,
    padding: 24,
    elevation: 10,
  },
  modalTitle: {
    ...Typography.sectionHeading,
    marginBottom: 8,
  },
  modalSubtitle: {
    ...Typography.body,
    marginBottom: 20,
  },
});

export default SignInScreen;
