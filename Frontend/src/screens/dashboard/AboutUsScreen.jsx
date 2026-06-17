import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import StoneBeamLogo from '../../components/common/StoneBeamLogo';
import CardWrapper from '../../components/common/CardWrapper';
import Typography from '../../constants/typography';


const FEATURES = [
  { icon: 'account-group', title: 'Connect', desc: 'Find and connect with builders, contractors, and clients' },
  { icon: 'magnify', title: 'Discover', desc: 'Browse projects that match your skills and location' },
  { icon: 'trending-up', title: 'Grow', desc: 'Build your reputation and expand your network' },
  { icon: 'shield-check', title: 'Trust', desc: 'Verified profiles and secure transactions' },
];

const TEAM = [
  { name: 'Henil Patel', role: 'CEO & Founder' },
  { name: 'Nandanee Prajapati', role: 'CEO & Founder' },
];

const AboutUsScreen = ({ navigation }) => {
  const { colors } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>About Us</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Logo & Tagline */}
        <View style={[styles.logoSection, { backgroundColor: colors.primary }]}>
          <StoneBeamLogo size="medium" showTagline />
        </View>

        {/* Mission */}
        <CardWrapper style={styles.card}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Our Mission</Text>
          <Text style={[styles.missionText, { color: colors.textSecondary }]}>
            StoneBeam-NH is revolutionizing the construction industry by creating a unified platform
            that connects all stakeholders — from builders and contractors to clients and skilled
            labourers. We believe in empowering every construction professional with the tools
            they need to grow their business and deliver quality work.
          </Text>
        </CardWrapper>

        {/* Features */}
        <CardWrapper style={styles.card}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>What We Offer</Text>
          {FEATURES.map((feat) => (
            <View key={feat.title} style={styles.featureRow}>
              <View style={[styles.featureIcon, { backgroundColor: colors.accentTint }]}>
                <MaterialCommunityIcons name={feat.icon} size={24} color={colors.accent} />
              </View>
              <View style={styles.featureContent}>
                <Text style={[styles.featureTitle, { color: colors.textPrimary }]}>{feat.title}</Text>
                <Text style={[styles.featureDesc, { color: colors.textSecondary }]}>{feat.desc}</Text>
              </View>
            </View>
          ))}
        </CardWrapper>

        {/* Team */}
        <CardWrapper style={styles.card}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Our Team</Text>
          <View style={styles.teamGrid}>
            {TEAM.map((member) => (
              <View key={member.name} style={[styles.teamCard, { backgroundColor: colors.surface }]}>
                <View style={[styles.teamAvatar, { backgroundColor: colors.accentTint }]}>
                  <MaterialCommunityIcons name="account" size={28} color={colors.accent} />
                </View>
                <Text style={[styles.teamName, { color: colors.textPrimary }]}>{member.name}</Text>
                <Text style={[styles.teamRole, { color: colors.textSecondary }]}>{member.role}</Text>
              </View>
            ))}
          </View>
        </CardWrapper>

        {/* Social & Rating */}
        <CardWrapper style={[styles.card, { alignItems: 'center' }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Follow Us</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity
              style={[styles.socialBtn, { backgroundColor: colors.accentTint }]}
              onPress={() => Linking.openURL('https://www.linkedin.com/in/stonebeam-nh-stonebeam-nh-44b4143a2/')}
            >
              <MaterialCommunityIcons
                name="linkedin"
                size={24}
                color={colors.accent}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialBtn, { backgroundColor: colors.accentTint }]}
              onPress={() => Linking.openURL('https://x.com/StonebeamNH2025')}
            >
              <MaterialCommunityIcons
                name="twitter"
                size={24}
                color={colors.accent}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialBtn, { backgroundColor: colors.accentTint }]}
              onPress={() => Linking.openURL('https://www.instagram.com/stone_beam.nh?igsh=Mmxta2M0dndjaDg4')}
            >
              <MaterialCommunityIcons
                name="instagram"
                size={24}
                color={colors.accent}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.socialBtn, { backgroundColor: colors.accentTint }]}
              onPress={() => Linking.openURL('https://www.facebook.com/profile.php?id=61585666420383')}
            >
              <MaterialCommunityIcons
                name="facebook"
                size={24}
                color={colors.accent}
              />
            </TouchableOpacity>
          </View>

          {/* Rate */}
          <Text style={[styles.rateLabel, { color: colors.textPrimary }]}>Rate StoneBeam-NH</Text>
          <View style={styles.starRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <TouchableOpacity key={s}>
                <MaterialCommunityIcons name="star" size={32} color={colors.accent} />
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.version, { color: colors.textSecondary }]}>Version 1.0.0</Text>
        </CardWrapper>
      </ScrollView>
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
  scrollContent: { paddingBottom: 32 },
  logoSection: { alignItems: 'center', paddingVertical: 40, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, marginBottom: 16 },
  card: { marginHorizontal: 16, paddingTop: 20 },
  sectionTitle: { ...Typography.cardTitle, marginBottom: 12 },
  missionText: { ...Typography.body, lineHeight: 24 },
  featureRow: { flexDirection: 'row', gap: 14, marginBottom: 16, alignItems: 'center' },
  featureIcon: { width: 48, height: 48, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  featureContent: { flex: 1 },
  featureTitle: { ...Typography.cardTitle, fontSize: 15, marginBottom: 2 },
  featureDesc: { ...Typography.caption },
  teamGrid: { flexDirection: 'row', gap: 10 },
  teamCard: { flex: 1, alignItems: 'center', padding: 12, borderRadius: 12 },
  teamAvatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: 8 },
  teamName: { ...Typography.caption, fontWeight: '600', textAlign: 'center' },
  teamRole: { fontSize: 10, textAlign: 'center', marginTop: 2 },
  socialRow: { flexDirection: 'row', gap: 16, marginBottom: 20 },
  socialBtn: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  rateLabel: { ...Typography.cardTitle, marginBottom: 8 },
  starRow: { flexDirection: 'row', gap: 8, marginBottom: 16 },
  version: { ...Typography.caption },
});

export default AboutUsScreen;
