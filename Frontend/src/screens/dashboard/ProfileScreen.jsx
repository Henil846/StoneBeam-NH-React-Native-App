import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import ProfileHeader from '../../components/profile/ProfileHeader';
import CardWrapper from '../../components/common/CardWrapper';
import Typography from '../../constants/typography';

const ProfileScreen = ({ navigation }) => {
  const { colors, user } = useApp();
  const insets = useSafeAreaInsets();

  const skills = user?.skills || [];

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back + Edit */}
        <View style={[styles.topBar, { top: insets.top + 8 }]}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBtn}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBtn}>
            <MaterialCommunityIcons name="pencil" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>

        <ProfileHeader user={user} />

        {/* Bio */}
        <CardWrapper style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>About</Text>
          <Text style={[styles.bio, { color: colors.textSecondary }]}>
            {user?.bio || 'No bio added yet.'}
          </Text>
        </CardWrapper>

        {/* Skills */}
        <CardWrapper style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Skills & Specialities</Text>
          <View style={styles.chipRow}>
            {skills.map((skill, i) => (
              <View key={i} style={[styles.skillChip, { backgroundColor: colors.accentTint }]}>
                <Text style={[styles.skillText, { color: colors.accent }]}>{skill}</Text>
              </View>
            ))}
          </View>
        </CardWrapper>

        {/* Verification */}
        <CardWrapper style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Verification</Text>
          <View style={styles.verifyRow}>
            <View style={styles.verifyItem}>
              <MaterialCommunityIcons name="check-decagram" size={22} color={colors.success} />
              <Text style={[styles.verifyText, { color: colors.textPrimary }]}>ID Verified</Text>
            </View>
            <View style={styles.verifyItem}>
              <MaterialCommunityIcons name="check-decagram" size={22} color={colors.success} />
              <Text style={[styles.verifyText, { color: colors.textPrimary }]}>Phone Verified</Text>
            </View>
          </View>
        </CardWrapper>

        {/* Portfolio */}
        <CardWrapper style={[styles.section, { marginBottom: 32 }]}>
          <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>Portfolio</Text>
          <View style={styles.portfolioGrid}>
            {[1, 2, 3, 4].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.portfolioItem, { backgroundColor: colors.border }]}
                activeOpacity={0.7}
                onPress={() => navigation.navigate('ProjectDetail', { projectId: `proj_${item}` })}
              >
                <MaterialCommunityIcons name="image" size={32} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </CardWrapper>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    position: 'absolute',
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginHorizontal: 16,
    marginTop: 12,
    paddingTop: 20,
  },
  sectionTitle: {
    ...Typography.cardTitle,
    marginBottom: 12,
  },
  bio: {
    ...Typography.body,
    lineHeight: 22,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skillChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 50,
  },
  skillText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  verifyRow: {
    gap: 12,
  },
  verifyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  verifyText: {
    ...Typography.body,
  },
  portfolioGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  portfolioItem: {
    width: '47%',
    aspectRatio: 1.3,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProfileScreen;
