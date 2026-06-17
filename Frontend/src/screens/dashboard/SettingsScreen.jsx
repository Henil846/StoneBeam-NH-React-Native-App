import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Switch, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import Typography from '../../constants/typography';

const SettingRow = ({ icon, label, colors, onPress, rightElement, danger }) => (
  <TouchableOpacity style={styles.settingRow} onPress={onPress} activeOpacity={0.7}>
    <View style={styles.settingLeft}>
      <MaterialCommunityIcons name={icon} size={22} color={danger ? colors.error : colors.accent} />
      <Text style={[styles.settingLabel, { color: danger ? colors.error : colors.textPrimary }]}>{label}</Text>
    </View>
    {rightElement || <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textSecondary} />}
  </TouchableOpacity>
);

const SectionTitle = ({ title, colors }) => (
  <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>{title}</Text>
);

const SettingsScreen = ({ navigation }) => {
  const { colors, isDarkMode, toggleDarkMode, logout } = useApp();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState({ projects: true, messages: true, orders: true, system: false });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [language, setLanguage] = useState('English');

  const handleLogout = () => {
    logout();
    navigation.reset({ index: 0, routes: [{ name: 'RoleSelection' }] });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Account */}
        <SectionTitle title="ACCOUNT" colors={colors} />
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <SettingRow icon="account-edit" label="Edit Profile" colors={colors} onPress={() => {}} />
          <SettingRow icon="lock-reset" label="Change Password" colors={colors} onPress={() => {}} />
          <SettingRow icon="phone-refresh" label="Update Phone/Email" colors={colors} onPress={() => {}} />
        </View>

        {/* Notifications */}
        <SectionTitle title="NOTIFICATIONS" colors={colors} />
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          {Object.entries(notifications).map(([key, val]) => (
            <SettingRow
              key={key}
              icon="bell-outline"
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              colors={colors}
              rightElement={
                <Switch
                  value={val}
                  onValueChange={(v) => setNotifications((prev) => ({ ...prev, [key]: v }))}
                  trackColor={{ false: colors.border, true: colors.accent + '60' }}
                  thumbColor={val ? colors.accent : '#666666'}
                />
              }
            />
          ))}
        </View>

        {/* Appearance */}
        <SectionTitle title="APPEARANCE" colors={colors} />
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <SettingRow
            icon="theme-light-dark"
            label="Dark Mode"
            colors={colors}
            rightElement={
              <Switch
                value={isDarkMode}
                onValueChange={toggleDarkMode}
                trackColor={{ false: colors.border, true: colors.accent + '60' }}
                thumbColor={isDarkMode ? colors.accent : '#666666'}
              />
            }
          />
        </View>

        {/* Language */}
        <SectionTitle title="LANGUAGE" colors={colors} />
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          {['English', 'Hindi', 'Regional'].map((lang) => (
            <SettingRow
              key={lang}
              icon="translate"
              label={lang}
              colors={colors}
              onPress={() => setLanguage(lang)}
              rightElement={
                language === lang ? <MaterialCommunityIcons name="check-circle" size={22} color={colors.accent} /> : null
              }
            />
          ))}
        </View>

        {/* Help */}
        <SectionTitle title="HELP" colors={colors} />
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <SettingRow icon="frequently-asked-questions" label="FAQs" colors={colors} onPress={() => navigation.navigate('CustomerCare')} />
          <SettingRow icon="bug" label="Report a Problem" colors={colors} onPress={() => {}} />
        </View>

        {/* Danger Zone */}
        <SectionTitle title="DANGER ZONE" colors={colors} />
        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <SettingRow icon="delete-forever" label="Delete Account" colors={colors} danger onPress={() => setShowDeleteModal(true)} />
        </View>

        {/* Logout */}
        <TouchableOpacity style={[styles.logoutBtn, { borderColor: colors.error }]} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={20} color={colors.error} />
          <Text style={[styles.logoutText, { color: colors.error }]}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Delete Confirmation Modal */}
      <Modal visible={showDeleteModal} transparent animationType="fade" onRequestClose={() => setShowDeleteModal(false)}>
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setShowDeleteModal(false)}>
          <View style={[styles.modalCard, { backgroundColor: colors.card }]}>
            <MaterialCommunityIcons name="alert-circle" size={48} color={colors.error} style={{ alignSelf: 'center', marginBottom: 12 }} />
            <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>Delete Account?</Text>
            <Text style={[styles.modalText, { color: colors.textSecondary }]}>
              This action is permanent and cannot be undone. All your data will be lost.
            </Text>
            <View style={styles.modalBtns}>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: colors.surface }]} onPress={() => setShowDeleteModal(false)}>
                <Text style={{ color: colors.textPrimary, fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalBtn, { backgroundColor: colors.error }]} onPress={() => setShowDeleteModal(false)}>
                <Text style={{ color: '#FFF', fontWeight: '600' }}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: 16, paddingBottom: 12,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3,
  },
  backBtn: { padding: 8 },
  headerTitle: { ...Typography.cardTitle, fontSize: 18 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  sectionTitle: { ...Typography.label, marginTop: 20, marginBottom: 8, marginLeft: 4 },
  section: { borderRadius: 12, overflow: 'hidden', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 2 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, minHeight: 52 },
  settingLeft: { flexDirection: 'row', alignItems: 'center', gap: 14, flex: 1 },
  settingLabel: { ...Typography.body },
  logoutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginTop: 24, padding: 16, borderRadius: 12, borderWidth: 2,
  },
  logoutText: { ...Typography.button },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 32 },
  modalCard: { borderRadius: 20, padding: 24 },
  modalTitle: { ...Typography.sectionHeading, textAlign: 'center', marginBottom: 8 },
  modalText: { ...Typography.body, textAlign: 'center', marginBottom: 20 },
  modalBtns: { flexDirection: 'row', gap: 12 },
  modalBtn: { flex: 1, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
});

export default SettingsScreen;
