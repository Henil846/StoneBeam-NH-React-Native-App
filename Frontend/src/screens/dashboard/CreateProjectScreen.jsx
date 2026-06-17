import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { useApp } from '../../context/AppContext';
import InputField from '../../components/common/InputField';
import PrimaryButton from '../../components/common/PrimaryButton';
import Typography from '../../constants/typography';

const PROJECT_TYPES = ['Residential', 'Commercial', 'Industrial', 'Renovation'];
const CATEGORIES = ['Construction', 'Electrical', 'Plumbing', 'Interior', 'Civil'];
const PRIORITIES = ['Low', 'Medium', 'High'];
const SKILL_OPTIONS = ['Concrete Work', 'Steel Framing', 'Electrical', 'Plumbing', 'Interior Design', 'Painting', 'Carpentry', 'Masonry', 'Roofing', 'Tiling'];

const CreateProjectScreen = ({ navigation }) => {
  const { colors } = useApp();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: '',
    type: '',
    category: '',
    location: '',
    budgetMin: '',
    budgetMax: '',
    startDate: '',
    endDate: '',
    description: '',
    skills: [],
    priority: 'Medium',
  });

  const updateField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleSkill = (skill) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Toast.show({
        type: 'success',
        text1: 'Project Posted!',
        text2: 'Your project is now live on StoneBeam-NH.',
      });
      navigation.goBack();
    }, 1500);
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
          <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Create Project</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <InputField
            label="Project Title"
            value={form.title}
            onChangeText={(v) => updateField('title', v)}
            leftIcon="clipboard-text-outline"
          />

          {/* Project Type Chips */}
          <Text style={[styles.label, { color: colors.textPrimary }]}>Project Type</Text>
          <View style={styles.chipRow}>
            {PROJECT_TYPES.map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() => updateField('type', type)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: form.type === type ? colors.accent : colors.card,
                    borderColor: form.type === type ? colors.accent : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: form.type === type ? '#FFF' : colors.textSecondary },
                  ]}
                >
                  {type}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Category Chips */}
          <Text style={[styles.label, { color: colors.textPrimary }]}>Category</Text>
          <View style={styles.chipRow}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => updateField('category', cat)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: form.category === cat ? colors.accent : colors.card,
                    borderColor: form.category === cat ? colors.accent : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: form.category === cat ? '#FFF' : colors.textSecondary },
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <InputField
            label="Location / City"
            value={form.location}
            onChangeText={(v) => updateField('location', v)}
            leftIcon="map-marker-outline"
          />

          {/* Budget Range */}
          <Text style={[styles.label, { color: colors.textPrimary }]}>Budget Range (₹)</Text>
          <View style={styles.budgetRow}>
            <InputField
              label="Min"
              value={form.budgetMin}
              onChangeText={(v) => updateField('budgetMin', v)}
              keyboardType="numeric"
              style={{ flex: 1 }}
            />
            <Text style={[styles.budgetDash, { color: colors.textSecondary }]}>–</Text>
            <InputField
              label="Max"
              value={form.budgetMax}
              onChangeText={(v) => updateField('budgetMax', v)}
              keyboardType="numeric"
              style={{ flex: 1 }}
            />
          </View>

          {/* Dates */}
          <View style={styles.dateRow}>
            <TouchableOpacity style={[styles.dateBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <MaterialCommunityIcons name="calendar" size={20} color={colors.accent} />
              <Text style={[styles.dateText, { color: form.startDate ? colors.textPrimary : colors.textSecondary }]}>
                {form.startDate || 'Start Date'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.dateBtn, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <MaterialCommunityIcons name="calendar" size={20} color={colors.accent} />
              <Text style={[styles.dateText, { color: form.endDate ? colors.textPrimary : colors.textSecondary }]}>
                {form.endDate || 'End Date'}
              </Text>
            </TouchableOpacity>
          </View>

          <InputField
            label="Description"
            value={form.description}
            onChangeText={(v) => updateField('description', v)}
            multiline
            maxLength={500}
            numberOfLines={4}
          />

          {/* Skills */}
          <Text style={[styles.label, { color: colors.textPrimary }]}>Required Skills</Text>
          <View style={styles.chipRow}>
            {SKILL_OPTIONS.map((skill) => (
              <TouchableOpacity
                key={skill}
                onPress={() => toggleSkill(skill)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: form.skills.includes(skill) ? colors.accent : colors.card,
                    borderColor: form.skills.includes(skill) ? colors.accent : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: form.skills.includes(skill) ? '#FFF' : colors.textSecondary },
                  ]}
                >
                  {skill}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Photo Upload Grid */}
          <Text style={[styles.label, { color: colors.textPrimary }]}>Upload Photos</Text>
          <View style={styles.photoGrid}>
            {[1, 2, 3, 4].map((i) => (
              <TouchableOpacity
                key={i}
                style={[styles.photoSlot, { borderColor: colors.border, backgroundColor: colors.card }]}
                activeOpacity={0.7}
              >
                <MaterialCommunityIcons name="plus" size={28} color={colors.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>

          {/* Priority */}
          <Text style={[styles.label, { color: colors.textPrimary }]}>Priority</Text>
          <View style={styles.chipRow}>
            {PRIORITIES.map((p) => (
              <TouchableOpacity
                key={p}
                onPress={() => updateField('priority', p)}
                style={[
                  styles.chip,
                  {
                    backgroundColor: form.priority === p ? colors.accent : colors.card,
                    borderColor: form.priority === p ? colors.accent : colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.chipText,
                    { color: form.priority === p ? '#FFF' : colors.textSecondary },
                  ]}
                >
                  {p}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <PrimaryButton
            title="Post Project"
            onPress={handleSubmit}
            loading={loading}
            style={styles.submitBtn}
          />
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  label: { ...Typography.caption, fontWeight: '600', marginBottom: 8, marginTop: 4 },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 50, borderWidth: 1 },
  chipText: { ...Typography.caption, fontWeight: '600' },
  budgetRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  budgetDash: { fontSize: 20, marginTop: -16 },
  dateRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  dateBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, padding: 14, borderRadius: 12, borderWidth: 1 },
  dateText: { ...Typography.body },
  photoGrid: { flexDirection: 'row', gap: 10, marginBottom: 16 },
  photoSlot: { width: 72, height: 72, borderRadius: 12, borderWidth: 2, borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center' },
  submitBtn: { marginTop: 8, marginBottom: 20 },
});

export default CreateProjectScreen;
