import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useApp } from '../../context/AppContext';
import InputField from '../../components/common/InputField';
import PrimaryButton from '../../components/common/PrimaryButton';
import RoleChip from '../../components/common/RoleChip';
import Typography from '../../constants/typography';
import { ROLES } from '../../constants/roles';

const RegisterScreen = ({ navigation }) => {
  const { colors, selectedRole, registerUser, roleConfig } = useApp();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    city: '',
    company: '',
    experience: '',
  });

  const showCompany = [ROLES.BUILDER, ROLES.CONTRACTOR, ROLES.DEALER].includes(selectedRole);
  const showExperience = [ROLES.CONTRACTOR, ROLES.SKILLED_LABOUR, ROLES.LABOURER].includes(selectedRole);

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleRegister = async () => {
    // Validation
    if (!form.fullName.trim() || !form.phone.trim() || !form.email.trim() || !form.password || !form.city.trim()) {
      Toast.show({ type: 'error', text1: 'Missing Fields', text2: 'Please fill all required fields.' });
      return;
    }
    if (form.password !== form.confirmPassword) {
      Toast.show({ type: 'error', text1: 'Password Mismatch', text2: 'Passwords do not match.' });
      return;
    }
    if (form.password.length < 6) {
      Toast.show({ type: 'error', text1: 'Weak Password', text2: 'Password must be at least 6 characters.' });
      return;
    }

    setLoading(true);
    try {
      await registerUser({
        name: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        password: form.password,
        role: selectedRole,
        city: form.city.trim(),
        company: form.company.trim() || undefined,
        experience: form.experience ? parseInt(form.experience, 10) : 0,
      });
      Toast.show({
        type: 'success',
        text1: 'Welcome to StoneBeam-NH!',
        text2: 'Your account has been created successfully.',
      });
      navigation.reset({ index: 0, routes: [{ name: 'MainApp' }] });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2: error.message || 'Could not create account. Try again.',
      });
    } finally {
      setLoading(false);
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
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Create Account</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Progress Bar */}
        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View style={[styles.progressFill, { backgroundColor: colors.accent }]} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Role Chip */}
          <TouchableOpacity
            onPress={() => navigation.navigate('RoleSelection')}
            style={styles.roleRow}
          >
            <RoleChip role={selectedRole} size="large" />
            <MaterialCommunityIcons name="pencil" size={16} color={colors.accent} />
          </TouchableOpacity>

          {/* Photo Upload */}
          <TouchableOpacity style={[styles.photoUpload, { borderColor: colors.border }]} activeOpacity={0.7}>
            <MaterialCommunityIcons name="camera-plus" size={32} color={colors.accent} />
            <Text style={[styles.photoText, { color: colors.textSecondary }]}>Add Profile Photo</Text>
          </TouchableOpacity>

          {/* Form Fields */}
          <InputField
            label="Full Name"
            value={form.fullName}
            onChangeText={(v) => updateField('fullName', v)}
            leftIcon="account-outline"
            returnKeyType="next"
          />

          <InputField
            label="Phone Number"
            value={form.phone}
            onChangeText={(v) => updateField('phone', v)}
            keyboardType="phone-pad"
            leftIcon="phone-outline"
            placeholder="+91 XXXXX XXXXX"
            returnKeyType="next"
          />

          <InputField
            label="Email Address"
            value={form.email}
            onChangeText={(v) => updateField('email', v)}
            keyboardType="email-address"
            leftIcon="email-outline"
            returnKeyType="next"
          />

          <InputField
            label="Password"
            value={form.password}
            onChangeText={(v) => updateField('password', v)}
            secureTextEntry
            leftIcon="lock-outline"
            returnKeyType="next"
          />

          <InputField
            label="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(v) => updateField('confirmPassword', v)}
            secureTextEntry
            leftIcon="lock-check-outline"
            returnKeyType="next"
          />

          <InputField
            label="City / Location"
            value={form.city}
            onChangeText={(v) => updateField('city', v)}
            leftIcon="map-marker-outline"
            returnKeyType="next"
          />

          {showCompany && (
            <InputField
              label="Company / Business Name"
              value={form.company}
              onChangeText={(v) => updateField('company', v)}
              leftIcon="domain"
              returnKeyType="next"
            />
          )}

          {showExperience && (
            <InputField
              label="Experience (Years)"
              value={form.experience}
              onChangeText={(v) => updateField('experience', v)}
              keyboardType="numeric"
              leftIcon="briefcase-outline"
              returnKeyType="done"
              blurOnSubmit
            />
          )}

          <PrimaryButton
            title="Register"
            onPress={handleRegister}
            loading={loading}
            style={styles.registerBtn}
          />

          <TouchableOpacity
            onPress={() => navigation.navigate('SignIn')}
            style={styles.switchLink}
          >
            <Text style={[styles.switchText, { color: colors.textSecondary }]}>
              Already have an account?{' '}
              <Text style={{ color: colors.accent, fontWeight: '600' }}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>
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
  progressBar: {
    height: 3,
    width: '100%',
  },
  progressFill: {
    height: 3,
    width: '100%',
    borderRadius: 1.5,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  roleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  photoUpload: {
    alignSelf: 'center',
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 4,
  },
  photoText: {
    fontSize: 10,
    textAlign: 'center',
  },
  registerBtn: {
    marginTop: 8,
  },
  switchLink: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  switchText: {
    ...Typography.body,
  },
});

export default RegisterScreen;
