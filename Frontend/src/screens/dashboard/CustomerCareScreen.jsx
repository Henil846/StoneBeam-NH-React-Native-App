import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import CardWrapper from '../../components/common/CardWrapper';
import PrimaryButton from '../../components/common/PrimaryButton';
import Typography from '../../constants/typography';

const FAQS = [
  { q: 'How do I create a project on StoneBeam-NH?', a: 'Go to your dashboard and tap "Create Project". Fill in the project details including title, type, budget, and required skills. Once posted, contractors and builders can view and apply.' },
  { q: 'How do I find a contractor?', a: 'Navigate to "Find Contractor" from your dashboard or drawer menu. Use filters to narrow down by location, rating, and specialization. You can view profiles and connect directly.' },
  { q: 'Is my data safe on StoneBeam-NH?', a: 'Yes! We use industry-standard encryption and security practices to protect your data. Your personal information is never shared without your consent.' },
  { q: 'How do I track my order status?', a: 'Go to "Order Status" from the dashboard. You can see the real-time status of all your orders with a progress tracker showing each stage from placement to delivery.' },
  { q: 'Can I switch my role after registering?', a: 'Currently, role switching requires re-registration. Contact our support team for assistance with role changes.' },
  { q: 'How does the attendance system work?', a: 'Labourers can check in and out daily using the Attendance feature. It tracks your working hours, present days, and generates monthly reports for contractors.' },
];

const CustomerCareScreen = ({ navigation }) => {
  const { colors } = useApp();
  const insets = useSafeAreaInsets();
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Customer Care</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero */}
        <View style={[styles.hero, { backgroundColor: colors.accentTint }]}>
          <MaterialCommunityIcons name="headset" size={48} color={colors.accent} />
          <Text style={[styles.heroTitle, { color: colors.textPrimary }]}>How can we help?</Text>
          <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
            We're here to assist you Mon–Sat, 9AM–6PM
          </Text>
        </View>

        {/* FAQ */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Frequently Asked Questions</Text>
        {FAQS.map((faq, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.faqItem, { backgroundColor: colors.card }]}
            activeOpacity={0.7}
            onPress={() => setExpandedFaq(expandedFaq === i ? null : i)}
          >
            <View style={styles.faqHeader}>
              <Text style={[styles.faqQ, { color: colors.textPrimary }]}>{faq.q}</Text>
              <MaterialCommunityIcons
                name={expandedFaq === i ? 'chevron-up' : 'chevron-down'}
                size={22}
                color={colors.accent}
              />
            </View>
            {expandedFaq === i && (
              <Text style={[styles.faqA, { color: colors.textSecondary }]}>{faq.a}</Text>
            )}
          </TouchableOpacity>
        ))}

        {/* Contact Options */}
        <Text style={[styles.sectionTitle, { color: colors.textPrimary, marginTop: 24 }]}>Contact Us</Text>

        <PrimaryButton
          title="💬  Chat with Support"
          onPress={() => setShowChatModal(true)}
          style={styles.contactBtn}
        />

        <TouchableOpacity style={[styles.contactRow, { backgroundColor: colors.card }]}>
          <MaterialCommunityIcons name="phone" size={22} color={colors.accent} />
          <View style={styles.contactInfo}>
            <Text style={[styles.contactLabel, { color: colors.textPrimary }]}>Call Us</Text>
            <Text style={[styles.contactValue, { color: colors.accent }]}>+91-9106120047/+91-7043297992</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textSecondary} />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.contactRow, { backgroundColor: colors.card }]}>
          <MaterialCommunityIcons name="email" size={22} color={colors.accent} />
          <View style={styles.contactInfo}>
            <Text style={[styles.contactLabel, { color: colors.textPrimary }]}>Email</Text>
            <Text style={[styles.contactValue, { color: colors.accent }]}>stonebeamnh@gmail.com</Text>
          </View>
          <MaterialCommunityIcons name="chevron-right" size={22} color={colors.textSecondary} />
        </TouchableOpacity>

        {/* Support Hours */}
        <View style={[styles.hoursBadge, { backgroundColor: colors.accentTint }]}>
          <MaterialCommunityIcons name="clock-outline" size={18} color={colors.accent} />
          <Text style={[styles.hoursText, { color: colors.accent }]}>Support Hours: Mon–Sat, 9AM–6PM IST</Text>
        </View>
      </ScrollView>

      {/* Chat Modal */}
      <Modal visible={showChatModal} transparent animationType="slide" onRequestClose={() => setShowChatModal(false)}>
        <TouchableOpacity style={styles.modalBackdrop} activeOpacity={1} onPress={() => setShowChatModal(false)}>
          <View style={[styles.chatModal, { backgroundColor: colors.card }]}>
            <View style={styles.chatHeader}>
              <Text style={[styles.chatTitle, { color: colors.textPrimary }]}>Chat Support</Text>
              <TouchableOpacity onPress={() => setShowChatModal(false)}>
                <MaterialCommunityIcons name="close" size={24} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>
            <View style={styles.chatBody}>
              <View style={[styles.chatBubble, { backgroundColor: colors.accentTint }]}>
                <Text style={[styles.chatText, { color: colors.textPrimary }]}>
                  👋 Hello! Welcome to StoneBeam-NH Support. How can we help you today?
                </Text>
              </View>
              <Text style={[styles.chatTime, { color: colors.textSecondary }]}>Just now</Text>
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
  scrollContent: { padding: 16, paddingBottom: 32 },
  hero: { alignItems: 'center', padding: 32, borderRadius: 16, marginBottom: 24 },
  heroTitle: { ...Typography.sectionHeading, marginTop: 12, marginBottom: 4 },
  heroSub: { ...Typography.body, textAlign: 'center' },
  sectionTitle: { ...Typography.cardTitle, marginBottom: 12 },
  faqItem: { borderRadius: 12, padding: 16, marginBottom: 8, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 2 },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQ: { ...Typography.body, fontWeight: '600', flex: 1, marginRight: 8 },
  faqA: { ...Typography.body, marginTop: 10, lineHeight: 22 },
  contactBtn: { marginBottom: 12 },
  contactRow: {
    flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, marginBottom: 10, gap: 14,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 2,
  },
  contactInfo: { flex: 1 },
  contactLabel: { ...Typography.caption, fontWeight: '600' },
  contactValue: { ...Typography.body },
  hoursBadge: { flexDirection: 'row', alignItems: 'center', gap: 8, padding: 14, borderRadius: 12, marginTop: 16, justifyContent: 'center' },
  hoursText: { ...Typography.caption, fontWeight: '600' },
  modalBackdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  chatModal: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, minHeight: 300 },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  chatTitle: { ...Typography.sectionHeading },
  chatBody: { paddingVertical: 12 },
  chatBubble: { padding: 16, borderRadius: 16, borderTopLeftRadius: 4, maxWidth: '85%' },
  chatText: { ...Typography.body, lineHeight: 22 },
  chatTime: { ...Typography.caption, marginTop: 6, marginLeft: 4 },
});

export default CustomerCareScreen;
