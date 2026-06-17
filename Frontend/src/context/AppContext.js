import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getColors } from '../constants/colors';
import { ROLE_CONFIG } from '../constants/roles';
import { authAPI, setToken, removeToken, getToken } from '../services/api';

const AppContext = createContext();

const STORAGE_KEYS = {
  ROLE: '@stonebeam_role',
  AUTH_TOKEN: '@stonebeam_auth_token',
  DARK_MODE: '@stonebeam_dark_mode',
  USER: '@stonebeam_user',
};

// Fallback user shape when offline / not logged in
const DEFAULT_USER = {
  id: '',
  name: '',
  role: '',
  city: '',
  phone: '',
  email: '',
  company: '',
  experience: 0,
  rating: '0',
  reviewCount: 0,
  skills: [],
  bio: '',
  memberSince: new Date().getFullYear().toString(),
  isVerified: false,
  projectCount: 0,
  connections: 0,
  avatar: null,
};

export const AppProvider = ({ children }) => {
  const [selectedRole, setSelectedRoleState] = useState(null);
  const [isAuthenticated, setIsAuthenticatedState] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [user, setUser] = useState(DEFAULT_USER);
  const [isLoading, setIsLoading] = useState(true);

  const colors = getColors(isDarkMode);

  // ─── Load persisted state on mount ───
  useEffect(() => {
    const loadPersistedState = async () => {
      try {
        const [storedRole, storedToken, storedDarkMode] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.ROLE),
          getToken(),
          AsyncStorage.getItem(STORAGE_KEYS.DARK_MODE),
        ]);

        if (storedRole) setSelectedRoleState(storedRole);
        if (storedDarkMode !== null) setIsDarkMode(storedDarkMode === 'true');

        // If we have a stored token, try to fetch the user profile
        if (storedToken) {
          try {
            const response = await authAPI.getMe();
            if (response.success && response.data) {
              setUser(response.data);
              setIsAuthenticatedState(true);
            }
          } catch (err) {
            // Token expired, invalid, or server unreachable — clear it
            console.log('Auth check failed:', err.message);
            await removeToken();
          }
        }
      } catch (e) {
        console.log('Load persisted state error:', e.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadPersistedState();
  }, []);

  // ─── Role ───
  const setSelectedRole = useCallback(async (role) => {
    setSelectedRoleState(role);
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.ROLE, role);
    } catch (e) {
      // ignore
    }
  }, []);

  // ─── Auth ───
  const setIsAuthenticated = useCallback(async (value, token = null) => {
    setIsAuthenticatedState(value);
    try {
      if (value && token) {
        await setToken(token);
      } else if (!value) {
        await removeToken();
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // ─── Login helper ───
  const loginUser = useCallback(async (identifier, password) => {
    const response = await authAPI.login(identifier, password);
    if (response.success) {
      await setToken(response.data.token);
      setUser(response.data.user);
      setIsAuthenticatedState(true);
      if (response.data.user.role) {
        setSelectedRoleState(response.data.user.role);
        await AsyncStorage.setItem(STORAGE_KEYS.ROLE, response.data.user.role);
      }
    }
    return response;
  }, []);

  // ─── Register helper ───
  const registerUser = useCallback(async (userData) => {
    const response = await authAPI.register(userData);
    if (response.success) {
      await setToken(response.data.token);
      setUser(response.data.user);
      setIsAuthenticatedState(true);
    }
    return response;
  }, []);

  // ─── Dark mode ───
  const toggleDarkMode = useCallback(async () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      AsyncStorage.setItem(STORAGE_KEYS.DARK_MODE, String(next)).catch((e) => {});
      return next;
    });
  }, []);

  // ─── Update user locally + on server ───
  const updateUser = useCallback(async (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
    try {
      await authAPI.updateMe(updates);
    } catch (e) {
      // Keep local state even if server fails
    }
  }, []);

  // ─── Refresh user from server ───
  const refreshUser = useCallback(async () => {
    try {
      const response = await authAPI.getMe();
      if (response.success && response.data) {
        setUser(response.data);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // ─── Logout ───
  const logout = useCallback(async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem(STORAGE_KEYS.ROLE),
        removeToken(),
        AsyncStorage.removeItem(STORAGE_KEYS.USER),
      ]);
    } catch (e) {
      // ignore
    }
    setSelectedRoleState(null);
    setIsAuthenticatedState(false);
    setUser(DEFAULT_USER);
  }, []);

  const roleConfig = selectedRole ? ROLE_CONFIG[selectedRole] : null;

  return (
    <AppContext.Provider
      value={{
        // State
        selectedRole,
        isAuthenticated,
        isDarkMode,
        user,
        colors,
        roleConfig,
        isLoading,
        // Actions
        setSelectedRole,
        setIsAuthenticated,
        toggleDarkMode,
        updateUser,
        refreshUser,
        loginUser,
        registerUser,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export default AppContext;
