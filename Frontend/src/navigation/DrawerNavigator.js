import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';
import RoleChip from '../components/common/RoleChip';
import BottomTabNavigator from './BottomTabNavigator';
import Typography from '../constants/typography';

// Import all dashboard screens
import ProfileScreen from '../screens/dashboard/ProfileScreen';
import CreateProjectScreen from '../screens/dashboard/CreateProjectScreen';
import FindProjectScreen from '../screens/dashboard/FindProjectScreen';
import FindBuilderScreen from '../screens/dashboard/FindBuilderScreen';
import FindContractorScreen from '../screens/dashboard/FindContractorScreen';
import FindDealerScreen from '../screens/dashboard/FindDealerScreen';
import FindClientScreen from '../screens/dashboard/FindClientScreen';
import FindElectricianPlumberScreen from '../screens/dashboard/FindElectricianPlumberScreen';
import OrderStatusScreen from '../screens/dashboard/OrderStatusScreen';
import AttendanceScreen from '../screens/dashboard/AttendanceScreen';
import WorkStatusScreen from '../screens/dashboard/WorkStatusScreen';
import SettingsScreen from '../screens/dashboard/SettingsScreen';
import AboutUsScreen from '../screens/dashboard/AboutUsScreen';
import CustomerCareScreen from '../screens/dashboard/CustomerCareScreen';
import ProjectDetailScreen from '../screens/dashboard/ProjectDetailScreen';

const Drawer = createDrawerNavigator();
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const SCREEN_MAP = {
  Home: BottomTabNavigator,
  Profile: ProfileScreen,
  CreateProject: CreateProjectScreen,
  FindProject: FindProjectScreen,
  FindBuilder: FindBuilderScreen,
  FindContractor: FindContractorScreen,
  FindDealer: FindDealerScreen,
  FindClient: FindClientScreen,
  FindElectricianPlumber: FindElectricianPlumberScreen,
  OrderStatus: OrderStatusScreen,
  Attendance: AttendanceScreen,
  WorkStatus: WorkStatusScreen,
  Settings: SettingsScreen,
  AboutUs: AboutUsScreen,
  CustomerCare: CustomerCareScreen,
  ProjectDetail: ProjectDetailScreen,
};

const CustomDrawerContent = (props) => {
  const { colors, user, selectedRole, logout, roleConfig } = useApp();
  const { state, navigation } = props;
  const activeRoute = state.routes[state.index]?.name;

  const handleLogout = () => {
    navigation.closeDrawer();
    logout();
    props.navigation.reset({ index: 0, routes: [{ name: 'RoleSelection' }] });
  };

  return (
    <View style={[styles.drawerContainer, { backgroundColor: colors.surface }]}>
      {/* Header */}
      <LinearGradient
        colors={[colors.gradientStart, colors.gradientEnd]}
        style={styles.drawerHeader}
      >
        <View style={[styles.drawerAvatar, { borderColor: colors.accent }]}>
          <MaterialCommunityIcons name="account" size={32} color="#FFF" />
        </View>
        <Text style={styles.drawerName}>{user?.name || 'User'}</Text>
        <RoleChip role={selectedRole} />
        <Text style={styles.drawerCity}>
          <MaterialCommunityIcons name="map-marker" size={12} color="rgba(255,255,255,0.6)" />
          {' '}{user?.city || 'City'}
        </Text>
      </LinearGradient>

      {/* Menu Items */}
      <DrawerContentScrollView {...props} contentContainerStyle={styles.menuContent}>
        {roleConfig?.drawerMenu?.map((item) => {
          const isActive = activeRoute === item.screen;
          return (
            <TouchableOpacity
              key={item.screen}
              style={[
                styles.menuItem,
                isActive && { backgroundColor: colors.accentTint, borderLeftColor: colors.accent, borderLeftWidth: 3 },
              ]}
              onPress={() => {
                navigation.closeDrawer();
                navigation.navigate(item.screen);
              }}
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={item.icon}
                size={22}
                color={isActive ? colors.accent : colors.textSecondary}
              />
              <Text
                style={[
                  styles.menuLabel,
                  { color: isActive ? colors.accent : colors.textPrimary },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </DrawerContentScrollView>

      {/* Logout */}
      <TouchableOpacity style={styles.logoutItem} onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={22} color={colors.error} />
        <Text style={[styles.menuLabel, { color: colors.error }]}>Logout</Text>
      </TouchableOpacity>

      {/* Footer */}
      <View style={styles.drawerFooter}>
        <Text style={[styles.footerText, { color: colors.textSecondary }]}>v1.0.0 • Powered by StoneBeam-NH</Text>
      </View>
    </View>
  );
};

const DrawerNavigator = () => {
  const { colors } = useApp();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          width: SCREEN_WIDTH * 0.78,
          backgroundColor: colors.surface,
        },
        overlayColor: 'rgba(0,0,0,0.5)',
        swipeEdgeWidth: 50,
      }}
    >
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="CreateProject" component={CreateProjectScreen} />
      <Drawer.Screen name="FindProject" component={FindProjectScreen} />
      <Drawer.Screen name="FindBuilder" component={FindBuilderScreen} />
      <Drawer.Screen name="FindContractor" component={FindContractorScreen} />
      <Drawer.Screen name="FindDealer" component={FindDealerScreen} />
      <Drawer.Screen name="FindClient" component={FindClientScreen} />
      <Drawer.Screen name="FindElectricianPlumber" component={FindElectricianPlumberScreen} />
      <Drawer.Screen name="OrderStatus" component={OrderStatusScreen} />
      <Drawer.Screen name="Attendance" component={AttendanceScreen} />
      <Drawer.Screen name="WorkStatus" component={WorkStatusScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
      <Drawer.Screen name="AboutUs" component={AboutUsScreen} />
      <Drawer.Screen name="CustomerCare" component={CustomerCareScreen} />
      <Drawer.Screen name="ProjectDetail" component={ProjectDetailScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: { flex: 1 },
  drawerHeader: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  drawerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  drawerName: {
    ...Typography.cardTitle,
    color: '#FFF',
    fontSize: 18,
    marginBottom: 6,
  },
  drawerCity: {
    ...Typography.caption,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 6,
  },
  menuContent: {
    paddingTop: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 13,
    paddingHorizontal: 20,
    minHeight: 48,
  },
  menuLabel: {
    ...Typography.body,
    fontWeight: '500',
  },
  logoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 13,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.08)',
  },
  drawerFooter: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  footerText: {
    ...Typography.caption,
    fontSize: 11,
  },
});

export default DrawerNavigator;
