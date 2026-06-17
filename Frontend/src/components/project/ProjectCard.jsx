import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../common/StatusBadge';
import { formatCurrency } from '../../constants/mockData';
import Typography from '../../constants/typography';

const ProjectCard = ({ project, onPress, style }) => {
  const { colors } = useApp();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[styles.card, { backgroundColor: colors.card }, style]}
    >
      <View style={styles.topRow}>
        <View style={[styles.typeBadge, { backgroundColor: colors.accentTint }]}>
          <Text style={[styles.typeText, { color: colors.accent }]}>{project.type}</Text>
        </View>
        <StatusBadge status={project.status} />
      </View>

      <Text style={[styles.title, { color: colors.textPrimary }]} numberOfLines={2}>
        {project.title}
      </Text>

      <View style={styles.infoRow}>
        <MaterialCommunityIcons name="map-marker" size={14} color={colors.textSecondary} />
        <Text style={[styles.infoText, { color: colors.textSecondary }]}>{project.location}</Text>
        <Text style={[styles.dot, { color: colors.textSecondary }]}>•</Text>
        <Text style={[styles.infoText, { color: colors.accent }]}>
          {formatCurrency(project.budget.min)} – {formatCurrency(project.budget.max)}
        </Text>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.postedBy}>
          <View style={[styles.miniAvatar, { backgroundColor: colors.border }]}>
            <MaterialCommunityIcons name="account" size={14} color={colors.textSecondary} />
          </View>
          <Text style={[styles.postedText, { color: colors.textSecondary }]}>
            {project.postedBy.name}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.viewBtn, { borderColor: colors.accent }]}
          activeOpacity={0.7}
          onPress={onPress}
        >
          <Text style={[styles.viewBtnText, { color: colors.accent }]}>View Details</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    ...Typography.caption,
    fontWeight: '600',
  },
  title: {
    ...Typography.cardTitle,
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  infoText: {
    ...Typography.caption,
  },
  dot: {
    marginHorizontal: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  postedBy: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  miniAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postedText: {
    ...Typography.caption,
  },
  viewBtn: {
    borderWidth: 1.5,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
  viewBtnText: {
    ...Typography.buttonSmall,
    fontSize: 12,
  },
});

export default ProjectCard;
