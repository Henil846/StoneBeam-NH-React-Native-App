import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useApp } from '../../context/AppContext';
import Typography from '../../constants/typography';

const HeaderBar = ({ onMenuPress, onNotificationPress, onProfilePress, title }) => {
  const { colors, user } = useApp();
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient
      colors={[colors.gradientStart, colors.gradientEnd]}
      style={[styles.container, { paddingTop: insets.top + 8 }]}
    >
      {/* Amber accent bar */}
      <LinearGradient
        colors={[colors.accent, colors.accentLight]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.accentBar}
      />

      <View style={styles.content}>
        <View style={styles.left}>
          <TouchableOpacity onPress={onMenuPress} style={styles.iconBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="menu" size={26} color="#FFF" />
          </TouchableOpacity>
          {title ? (
            <Text style={styles.title} numberOfLines={1}>{title}</Text>
          ) : (
            <View style={styles.logoRow}>
              <Text style={styles.stone}>Stone</Text>
              <Text style={[styles.beam, { color: colors.accent }]}>Beam-NH</Text>
            </View>
          )}
        </View>

        <View style={styles.right}>
          <TouchableOpacity onPress={onNotificationPress} style={styles.iconBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#FFF" />
            <View style={[styles.notifDot, { backgroundColor: colors.accent }]} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onProfilePress} style={styles.avatar} activeOpacity={0.7}>
            <View style={[styles.avatarInner, { borderColor: colors.accent }]}>
              <MaterialCommunityIcons name="account" size={22} color="#FFF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  accentBar: {
    height: 4,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    padding: 6,
    position: 'relative',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stone: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: -0.3,
  },
  beam: {
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    flex: 1,
  },
  notifDot: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  avatar: {
    marginLeft: 4,
  },
  avatarInner: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
});

export default HeaderBar;
