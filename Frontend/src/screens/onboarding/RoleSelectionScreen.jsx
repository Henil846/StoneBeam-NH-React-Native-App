import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  FadeIn,
} from 'react-native-reanimated';
import { useApp } from '../../context/AppContext';

import PrimaryButton from '../../components/common/PrimaryButton';
import { ROLE_LIST } from '../../constants/roles';
import Typography from '../../constants/typography';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = (SCREEN_WIDTH - 56) / 2;

const RoleCard = ({ role, isSelected, onPress, colors, index }) => {
  const scale = useSharedValue(1);
  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    onPress();
  };

  return (
    <Animated.View
      entering={FadeIn.delay(index * 80).duration(400)}
      style={animStyle}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handlePress}
        style={[
          styles.roleCard,
          {
            backgroundColor: isSelected ? colors.accentTint : colors.card,
            borderColor: isSelected ? colors.accent : colors.border,
            borderWidth: isSelected ? 2 : 1,
            width: CARD_WIDTH,
          },
        ]}
      >
        {isSelected && (
          <View style={[styles.checkmark, { backgroundColor: colors.accent }]}>
            <MaterialCommunityIcons name="check" size={14} color="#FFF" />
          </View>
        )}
        <View style={[styles.iconCircle, { backgroundColor: isSelected ? colors.accent + '20' : colors.accentTint }]}>
          <MaterialCommunityIcons
            name={role.icon}
            size={36}
            color={colors.accent}
          />
        </View>
        <Text style={[styles.roleName, { color: colors.textPrimary }]}>{role.label}</Text>
        <Text style={[styles.roleDesc, { color: colors.textSecondary }]}>{role.descriptor}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const RoleSelectionScreen = ({ navigation }) => {
  const { colors, setSelectedRole } = useApp();
  const [selected, setSelected] = useState(null);

  const handleContinue = () => {
    if (selected) {
      setSelectedRole(selected);
      navigation.navigate('AuthLanding');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      {/* Top Section */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.topSection}
      >

        <Text style={styles.heading}>Who are you?</Text>
        <Text style={styles.subtitle}>Select your role to get started</Text>
      </LinearGradient>

      {/* Bottom Section */}
      <View style={[styles.bottomSection, { backgroundColor: colors.surface }]}>
        <View style={styles.grid}>
          {ROLE_LIST.map((role, index) => (
            <RoleCard
              key={role.id}
              role={role}
              isSelected={selected === role.id}
              onPress={() => setSelected(role.id)}
              colors={colors}
              index={index}
            />
          ))}
        </View>

        <PrimaryButton
          title="Continue"
          onPress={handleContinue}
          disabled={!selected}
          style={styles.continueBtn}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    paddingTop: 60,
    paddingBottom: 36,
    paddingHorizontal: 24,
    alignItems: 'center',
  },

  heading: {
    ...Typography.title,
    color: '#FFF',
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: 'rgba(255,255,255,0.7)',
  },
  bottomSection: {
    flex: 1,
    marginTop: -20,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 24,
    paddingHorizontal: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  roleCard: {
    height: 140,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    position: 'relative',
  },
  checkmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  roleName: {
    ...Typography.cardTitle,
    fontSize: 14,
    marginBottom: 2,
  },
  roleDesc: {
    ...Typography.caption,
    textAlign: 'center',
    fontSize: 11,
  },
  continueBtn: {
    marginTop: 24,
    marginHorizontal: 8,
    marginBottom: 24,
  },
});

export default RoleSelectionScreen;
