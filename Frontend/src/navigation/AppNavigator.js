import React from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import RoleSelectionScreen from '../screens/onboarding/RoleSelectionScreen';
import AuthLandingScreen from '../screens/auth/AuthLandingScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import DrawerNavigator from './DrawerNavigator';
import { useApp } from '../context/AppContext';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isAuthenticated, selectedRole } = useApp();

  const initialRoute = (isAuthenticated && selectedRole) ? 'MainApp' : 'RoleSelection';

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        gestureEnabled: true,
      }}
    >
      <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />
      <Stack.Screen name="AuthLanding" component={AuthLandingScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen
        name="MainApp"
        component={DrawerNavigator}
        options={{
          gestureEnabled: false,
          ...TransitionPresets.FadeFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
