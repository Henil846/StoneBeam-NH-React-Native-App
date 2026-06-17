import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../../components/common/StatusBadge';
import PrimaryButton from '../../components/common/PrimaryButton';
import CardWrapper from '../../components/common/CardWrapper';
import { MOCK_PROJECTS, formatCurrency } from '../../constants/mockData';
import Typography from '../../constants/typography';

const ProjectDetailScreen = ({ navigation, route }) => {
  const { colors } = useApp();
  const insets = useSafeAreaInsets();
  const projectId = route?.params?.projectId;
  const project = MOCK_PROJECTS.find((p) => p.id === projectId) || MOCK_PROJECTS[0];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={[styles.hero, { paddingTop: insets.top + 10 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <View style={styles.heroContent}>
            <View style={[styles.typeBadge, { backgroundColor: 'rgba(255,255,255,0.15)' }]}>
              <Text style={styles.typeText}>{project.type}</Text>
            </View>
            <Text style={styles.heroTitle}>{project.title}</Text>
            <View style={styles.heroMeta}>
              <MaterialCommunityIcons name="map-marker" size={16} color="rgba(255,255,255,0.7)" />
              <Text style={styles.heroMetaText}>{project.location}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Status & Budget */}
        <View style={styles.quickInfo}>
          <View style={[styles.infoBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Status</Text>
            <StatusBadge status={project.status} size="large" />
          </View>
          <View style={[styles.infoBox, { backgroundColor: colors.card }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>Budget</Text>
            <Text style={[styles.budgetText, { color: colors.accent }]}>
              {formatCurrency(project.budget.min)} – {formatCurrency(project.budget.max)}
            </Text>
          </View>
        </View>

        {/* Description */}
        <CardWrapper style={styles.card}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Description</Text>
          <Text style={[styles.descText, { color: colors.textSecondary }]}>{project.description}</Text>
        </CardWrapper>

        {/* Details */}
        <CardWrapper style={styles.card}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Project Details</Text>
          <DetailRow icon="calendar-start" label="Start Date" value={project.startDate} colors={colors} />
          <DetailRow icon="calendar-end" label="End Date" value={project.endDate} colors={colors} />
          <DetailRow icon="tag" label="Category" value={project.category} colors={colors} />
          <DetailRow icon="flag" label="Priority" value={project.priority} colors={colors} />
          <DetailRow icon="account-group" label="Applicants" value={`${project.applicants} applied`} colors={colors} />
        </CardWrapper>

        {/* Skills */}
        <CardWrapper style={styles.card}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Required Skills</Text>
          <View style={styles.chipRow}>
            {project.skills.map((skill, i) => (
              <View key={i} style={[styles.skillChip, { backgroundColor: colors.accentTint }]}>
                <Text style={[styles.skillText, { color: colors.accent }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </CardWrapper>

        {/* Posted By */}
        <CardWrapper style={[styles.card, { marginBottom: 24 }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Posted By</Text>
          <View style={styles.postedByRow}>
            <View style={[styles.postedAvatar, { backgroundColor: colors.accentTint }]}>
              <MaterialCommunityIcons name="account" size={24} color={colors.accent} />
            </View>
            <View>
              <Text style={[styles.postedName, { color: colors.textPrimary }]}>{project.postedBy.name}</Text>
              <Text style={[styles.postedRole, { color: colors.textSecondary }]}>{project.postedBy.role}</Text>
            </View>
          </View>
        </CardWrapper>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={[styles.bottomBar, { backgroundColor: colors.card, paddingBottom: insets.bottom + 12 }]}>
        <PrimaryButton title="Apply / Connect" onPress={() => {}} style={{ flex: 1 }} />
      </View>
    </View>
  );
};

const DetailRow = ({ icon, label, value, colors }) => (
  <View style={styles.detailRow}>
    <MaterialCommunityIcons name={icon} size={20} color={colors.accent} />
    <Text style={[styles.detailLabel, { color: colors.textSecondary }]}>{label}</Text>
    <Text style={[styles.detailValue, { color: colors.textPrimary }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1 },
  hero: { paddingHorizontal: 20, paddingBottom: 28, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  backBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(0,0,0,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  heroContent: { gap: 8 },
  typeBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8, alignSelf: 'flex-start' },
  typeText: { color: '#FFF', fontSize: 12, fontWeight: '600' },
  heroTitle: { ...Typography.title, color: '#FFF', fontSize: 24 },
  heroMeta: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  heroMetaText: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  quickInfo: { flexDirection: 'row', gap: 12, paddingHorizontal: 16, marginTop: -16 },
  infoBox: { flex: 1, padding: 16, borderRadius: 14, alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
  infoLabel: { ...Typography.caption, marginBottom: 6 },
  budgetText: { ...Typography.cardTitle },
  card: { marginHorizontal: 16, paddingTop: 20, marginTop: 12 },
  sectionTitle: { ...Typography.cardTitle, marginBottom: 12 },
  descText: { ...Typography.body, lineHeight: 24 },
  detailRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10, borderBottomWidth: 0.5, borderBottomColor: 'rgba(255, 255, 255, 0.08)' },
  detailLabel: { ...Typography.body, flex: 1 },
  detailValue: { ...Typography.body, fontWeight: '600' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillChip: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 50 },
  skillText: { ...Typography.caption, fontWeight: '600' },
  postedByRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  postedAvatar: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  postedName: { ...Typography.cardTitle },
  postedRole: { ...Typography.caption, textTransform: 'capitalize' },
  bottomBar: { padding: 16, flexDirection: 'row', elevation: 8, shadowColor: '#000', shadowOffset: { width: 0, height: -2 }, shadowOpacity: 0.1, shadowRadius: 6 },
});

export default ProjectDetailScreen;
