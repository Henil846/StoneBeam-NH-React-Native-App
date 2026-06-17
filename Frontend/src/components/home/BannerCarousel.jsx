import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp } from '../../context/AppContext';
import { MOCK_BANNERS } from '../../constants/mockData';
import Typography from '../../constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 32;
const BANNER_HEIGHT = 160;

const BannerCarousel = ({ style }) => {
  const { colors } = useApp();
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % MOCK_BANNERS.length;
      scrollRef.current?.scrollTo({
        x: nextIndex * (BANNER_WIDTH + 12),
        animated: true,
      });
      setActiveIndex(nextIndex);
    }, 4000);
    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = (e) => {
    const offset = e.nativeEvent.contentOffset.x;
    const index = Math.round(offset / (BANNER_WIDTH + 12));
    setActiveIndex(index);
  };

  return (
    <View style={[styles.container, style]}>
      <Animated.ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        snapToInterval={BANNER_WIDTH + 12}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        contentContainerStyle={styles.scrollContent}
      >
        {MOCK_BANNERS.map((banner) => (
          <LinearGradient
            key={banner.id}
            colors={banner.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.banner}
          >
            <View style={styles.bannerContent}>
              <Text style={styles.bannerTitle}>{banner.title}</Text>
              <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
            </View>
            <View style={styles.bannerDecor}>
              <View style={[styles.circle, { opacity: 0.1 }]} />
              <View style={[styles.circleSmall, { opacity: 0.08 }]} />
            </View>
          </LinearGradient>
        ))}
      </Animated.ScrollView>

      {/* Dots */}
      <View style={styles.dots}>
        {MOCK_BANNERS.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              {
                backgroundColor: i === activeIndex ? colors.accent : colors.border,
                width: i === activeIndex ? 24 : 8,
              },
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  banner: {
    width: BANNER_WIDTH,
    height: BANNER_HEIGHT,
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
    padding: 24,
  },
  bannerContent: {
    zIndex: 2,
    maxWidth: '70%',
  },
  bannerTitle: {
    ...Typography.sectionHeading,
    color: '#FFF',
    marginBottom: 8,
  },
  bannerSubtitle: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.85)',
  },
  bannerDecor: {
    position: 'absolute',
    right: -20,
    top: -20,
  },
  circle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFF',
  },
  circleSmall: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#FFF',
    position: 'absolute',
    bottom: -40,
    right: 30,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 12,
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
});

export default BannerCarousel;
