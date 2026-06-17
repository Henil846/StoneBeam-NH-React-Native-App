import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { AppProvider } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';

// Suppress non-critical warnings in dev
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'VirtualizedLists should never be nested',
]);

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer>
          <StatusBar barStyle="light-content" backgroundColor="#0a0a0f" />
          <AppNavigator />
        </NavigationContainer>
        <Toast position="top" topOffset={50} />
      </AppProvider>
    </SafeAreaProvider>
  );
}
