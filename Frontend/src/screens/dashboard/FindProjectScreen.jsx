import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import ProjectCard from '../../components/project/ProjectCard';
import StatusBadge from '../../components/common/StatusBadge';
import SkeletonCard from '../../components/common/SkeletonCard';
import EmptyState from '../../components/common/EmptyState';
import { MOCK_PROJECTS, MOCK_USERS } from '../../constants/mockData';
import Typography from '../../constants/typography';

const FILTER_CHIPS = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Ahmedabad'];

const FindProjectScreen = ({ navigation }) => {
  const { colors } = useApp();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const filtered = MOCK_PROJECTS.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || p.location === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>Find Projects</Text>
        <TouchableOpacity style={styles.backBtn}>
          <MaterialCommunityIcons name="tune-variant" size={22} color={colors.accent} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
        <MaterialCommunityIcons name="magnify" size={20} color={colors.textSecondary} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search projects..."
          placeholderTextColor={colors.textSecondary}
          style={[styles.searchInput, { color: colors.textPrimary }]}
        />
      </View>

      {/* Filters */}
      <FlatList
        horizontal
        data={FILTER_CHIPS}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setActiveFilter(item)}
            style={[
              styles.filterChip,
              {
                backgroundColor: activeFilter === item ? colors.accent : colors.card,
                borderColor: activeFilter === item ? colors.accent : colors.border,
              },
            ]}
          >
            <Text
              numberOfLines={1}
              style={{
                color: activeFilter === item ? '#FFF' : colors.textSecondary,
                fontSize: 13,
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Results */}
      {isLoading ? (
        <View style={styles.list}>
          {[1, 2, 3].map((i) => <SkeletonCard key={i} height={140} />)}
        </View>
      ) : filtered.length === 0 ? (
        <EmptyState icon="magnify" title="No projects found" message="Try adjusting your search or filters" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ProjectCard
              project={item}
              onPress={() => navigation.navigate('ProjectDetail', { projectId: item.id })}
            />
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  searchBar: {
    flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginTop: 12,
    paddingHorizontal: 14, paddingVertical: 10, borderRadius: 10, gap: 8,
    elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.03, shadowRadius: 2,
  },
  searchInput: { flex: 1, fontSize: 14 },
  filterRow: { paddingHorizontal: 16, paddingVertical: 12, gap: 8 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 7, borderRadius: 50, borderWidth: 1, minWidth: 48, alignItems: 'center', justifyContent: 'center' },
  list: { paddingHorizontal: 16, paddingBottom: 20 },
});

export default FindProjectScreen;
