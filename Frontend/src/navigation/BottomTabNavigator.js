import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import Typography from '../constants/typography';

// Import screens
import HomeScreen from '../screens/dashboard/HomeScreen';
import ProfileScreen from '../screens/dashboard/ProfileScreen';
import CreateProjectScreen from '../screens/dashboard/CreateProjectScreen';
import FindProjectScreen from '../screens/dashboard/FindProjectScreen';
import FindBuilderScreen from '../screens/dashboard/FindBuilderScreen';
import FindContractorScreen from '../screens/dashboard/FindContractorScreen';
import FindDealerScreen from '../screens/dashboard/FindDealerScreen';
import FindClientScreen from '../screens/dashboard/FindClientScreen';
import OrderStatusScreen from '../screens/dashboard/OrderStatusScreen';
import AttendanceScreen from '../screens/dashboard/AttendanceScreen';
import WorkStatusScreen from '../screens/dashboard/WorkStatusScreen';

const Tab = createBottomTabNavigator();

const SCREEN_MAP = {
  Home: HomeScreen,
  Profile: ProfileScreen,
  CreateProject: CreateProjectScreen,
  FindProject: FindProjectScreen,
  FindBuilder: FindBuilderScreen,
  FindContractor: FindContractorScreen,
  FindDealer: FindDealerScreen,
  FindClient: FindClientScreen,
  OrderStatus: OrderStatusScreen,
  Attendance: AttendanceScreen,
  WorkStatus: WorkStatusScreen,
};

const FabButton = ({ onPress, colors }) => (
  <TouchableOpacity style={[styles.fabButton, { backgroundColor: colors.accent }]} onPress={onPress} activeOpacity={0.8}>
    <View style={styles.fabInner}>
      <MaterialCommunityIcons name="plus" size={28} color="#FFF" />
    </View>
  </TouchableOpacity>
);

const BottomTabNavigator = () => {
  const { colors, roleConfig } = useApp();
  const tabs = roleConfig?.bottomTabs || [];

  // Guard: Tab.Navigator requires at least one screen
  if (tabs.length === 0) {
    return <View style={{ flex: 1, backgroundColor: colors.surface }} />;
  }

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.tabBar,
          borderTopColor: colors.border,
          borderTopWidth: 0.5,
          height: 68,
          paddingBottom: 10,
          paddingTop: 8,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.08,
          shadowRadius: 8,
        },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarLabelStyle: {
          ...Typography.tabLabel,
        },
      }}
    >
      {tabs.map((tab, index) => {
        const ScreenComponent = SCREEN_MAP[tab.screen] || HomeScreen;
        return (
          <Tab.Screen
            key={tab.screen + index}
            name={`Tab_${tab.screen}`}
            component={ScreenComponent}
            options={{
              tabBarLabel: tab.label,
              tabBarIcon: ({ color, size, focused }) => {
                if (tab.isFab) {
                  return (
                    <View style={[styles.fabContainer, { backgroundColor: colors.accent }]}>
                      <MaterialCommunityIcons name={tab.icon} size={26} color="#FFF" />
                    </View>
                  );
                }
                return (
                  <View style={styles.tabIconContainer}>
                    <MaterialCommunityIcons name={tab.icon} size={24} color={color} />
                    {focused && <View style={[styles.activeIndicator, { backgroundColor: colors.accent }]} />}
                  </View>
                );
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    gap: 2,
  },
  activeIndicator: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    marginTop: 2,
  },
  fabContainer: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    elevation: 6,
    shadowColor: '#7b2cbf',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    elevation: 6,
  },
  fabInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BottomTabNavigator;
