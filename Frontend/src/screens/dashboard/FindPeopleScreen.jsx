import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import SkeletonCard from '../../components/common/SkeletonCard';
import EmptyState from '../../components/common/EmptyState';
import Typography from '../../constants/typography';

const CITIES = ['All', 'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Ahmedabad'];

const PersonCard = ({ person, colors, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    style={[styles.personCard, { backgroundColor: colors.card }]}
  >
    <View style={[styles.avatar, { backgroundColor: colors.accentTint }]}>
      <MaterialCommunityIcons name="account" size={28} color={colors.accent} />
    </View>
    <View style={styles.personInfo}>
      <Text style={[styles.personName, { color: colors.textPrimary }]} numberOfLines={1}>{person.name}</Text>
      <View style={styles.ratingRow}>
        <MaterialCommunityIcons name="star" size={14} color={colors.accent} />
        <Text style={[styles.ratingText, { color: colors.textSecondary }]}>
          {person.rating} ({person.reviewCount})
        </Text>
        <Text style={[styles.dot, { color: colors.textSecondary }]}>•</Text>
        <Text style={[styles.cityText, { color: colors.textSecondary }]}>{person.city}</Text>
      </View>
      <View style={styles.skillTags}>
        {person.skills?.slice(0, 2).map((s, i) => (
          <View key={i} style={[styles.skillTag, { backgroundColor: colors.accentTint }]}>
            <Text style={[styles.skillTagText, { color: colors.accent }]}>{s}</Text>
          </View>
        ))}
      </View>
    </View>
    <TouchableOpacity style={[styles.connectBtn, { borderColor: colors.accent }]} onPress={onPress}>
      <Text style={[styles.connectText, { color: colors.accent }]}>View</Text>
    </TouchableOpacity>
  </TouchableOpacity>
);

const FindPeopleScreen = ({ navigation, title, data }) => {
  const { colors } = useApp();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(t);
  }, []);

  const filtered = (data || []).filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === 'All' || p.city === activeFilter;
    return matchSearch && matchFilter;
  });

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.header, { paddingTop: insets.top + 10, backgroundColor: colors.card }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.textPrimary }]}>{title}</Text>
        <TouchableOpacity style={styles.backBtn}>
          <MaterialCommunityIcons name="tune-variant" size={22} color={colors.accent} />
        </TouchableOpacity>
      </View>

      <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
        <MaterialCommunityIcons name="magnify" size={20} color={colors.textSecondary} />
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder={`Search ${title.toLowerCase()}...`}
          placeholderTextColor={colors.textSecondary}
          style={[styles.searchInput, { color: colors.textPrimary }]}
        />
      </View>

      <FlatList
        horizontal
        data={CITIES}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setActiveFilter(item)}
            style={[styles.filterChip, {
              backgroundColor: activeFilter === item ? colors.accent : colors.card,
              borderColor: activeFilter === item ? colors.accent : colors.border,
            }]}
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

      {isLoading ? (
        <View style={styles.list}>
          {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} height={90} />)}
        </View>
      ) : filtered.length === 0 ? (
        <EmptyState icon="account-search" title="No results found" message="Try adjusting your search" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <PersonCard person={item} colors={colors} onPress={() => {}} />}
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
  personCard: {
    flexDirection: 'row', alignItems: 'center', padding: 14, borderRadius: 12, marginBottom: 10,
    elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, gap: 12,
  },
  avatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  personInfo: { flex: 1, gap: 4 },
  personName: { ...Typography.cardTitle, fontSize: 15 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { fontSize: 12 },
  dot: { fontSize: 10 },
  cityText: { fontSize: 12 },
  skillTags: { flexDirection: 'row', gap: 6, marginTop: 4 },
  skillTag: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 50 },
  skillTagText: { fontSize: 10, fontWeight: '600' },
  connectBtn: { borderWidth: 1.5, borderRadius: 8, paddingVertical: 6, paddingHorizontal: 14 },
  connectText: { fontSize: 13, fontWeight: '600' },
});

export default FindPeopleScreen;
