import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../context/AppContext';
import HeaderBar from '../../components/common/HeaderBar';
import SectionHeader from '../../components/common/SectionHeader';
import SkeletonCard from '../../components/common/SkeletonCard';
import BannerCarousel from '../../components/home/BannerCarousel';
import QuickActionGrid from '../../components/home/QuickActionGrid';
import FeedCard from '../../components/home/FeedCard';
import { MOCK_FEED } from '../../constants/mockData';

const HomeScreen = ({ navigation }) => {
  const { colors, roleConfig } = useApp();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleQuickAction = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <HeaderBar
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={() => {}}
        onProfilePress={() => navigation.navigate('Profile')}
      />

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <View style={[styles.searchBar, { backgroundColor: colors.card }]}>
          <MaterialCommunityIcons name="magnify" size={22} color={colors.textSecondary} />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search projects, people, materials..."
            placeholderTextColor={colors.textSecondary}
            style={[styles.searchInput, { color: colors.textPrimary }]}
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <MaterialCommunityIcons name="close-circle" size={20} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>

        {/* Banner Carousel */}
        {isLoading ? (
          <SkeletonCard height={160} style={{ marginHorizontal: 16 }} />
        ) : (
          <BannerCarousel />
        )}

        {/* Quick Actions */}
        <SectionHeader title="Quick Actions" style={{ paddingHorizontal: 16 }} />
        {isLoading ? (
          <View style={styles.skeletonGrid}>
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} width="48%" height={100} />
            ))}
          </View>
        ) : (
          <QuickActionGrid
            actions={roleConfig?.quickActions || []}
            onPress={handleQuickAction}
          />
        )}

        {/* Recent Activity */}
        <SectionHeader
          title="Recent Activity"
          onSeeAll={() => {}}
          style={{ paddingHorizontal: 16 }}
        />
        <View style={styles.feedList}>
          {isLoading ? (
            [1, 2, 3].map((i) => <SkeletonCard key={i} height={72} />)
          ) : (
            MOCK_FEED.map((item) => (
              <FeedCard
                key={item.id}
                item={item}
                onPress={() => navigation.navigate('ProjectDetail', { projectId: 'proj_1' })}
              />
            ))
          )}
        </View>
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity
        style={[styles.fab, { backgroundColor: colors.accent }]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('CreateProject')}
      >
        <MaterialCommunityIcons name="plus" size={28} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 80,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    gap: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    fontWeight: '400',
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  feedList: {
    paddingHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: '#7b2cbf',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});

export default HomeScreen;
