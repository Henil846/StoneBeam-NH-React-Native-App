/**
 * StoneBeam-NH API Service
 * ---------------------
 * Centralised HTTP client that every screen uses to talk to the backend.
 * Handles JWT tokens, base URL, request/response interceptors, and
 * provides methods for every API endpoint.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// ──────────────── CONFIG ────────────────
// Change this to your backend URL.
// For Android emulator use 10.0.2.2, for physical device use your local IP.
const BASE_URL = __DEV__
  ? 'http://10.0.2.2:5000/api'   // Android emulator
  : 'https://your-production-url.com/api';

// To use with a physical device on the same Wi-Fi, replace with your local IP:
// const BASE_URL = 'http://192.168.x.x:5000/api';

const STORAGE_KEY = '@stonebeam_auth_token';

// ──────────────── HELPERS ────────────────
const getToken = async () => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return null;
  }
};

const setToken = async (token) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, token);
  } catch (e) {}
};

const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
};

/**
 * Core fetch wrapper that adds Authorization header and handles JSON.
 */
const request = async (endpoint, options = {}) => {
  const token = await getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  // If body is FormData (file upload), remove Content-Type so fetch sets it
  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    // Network errors
    if (error.message === 'Network request failed') {
      throw new Error('Unable to connect to server. Check your connection.');
    }
    throw error;
  }
};

// ──────────────── AUTH API ────────────────
export const authAPI = {
  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),

  login: (identifier, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    }),

  forgotPassword: (identifier) =>
    request('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ identifier }),
    }),

  getMe: () => request('/auth/me'),

  updateMe: (updates) =>
    request('/auth/me', {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  changePassword: (currentPassword, newPassword) =>
    request('/auth/change-password', {
      method: 'PUT',
      body: JSON.stringify({ currentPassword, newPassword }),
    }),

  deleteAccount: () =>
    request('/auth/me', { method: 'DELETE' }),
};

// ──────────────── USERS API ────────────────
export const usersAPI = {
  getUsers: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/users?${query}`);
  },

  getUserById: (id) => request(`/users/${id}`),
};

// ──────────────── PROJECTS API ────────────────
export const projectsAPI = {
  getProjects: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/projects?${query}`);
  },

  getProjectById: (id) => request(`/projects/${id}`),

  createProject: (projectData) =>
    request('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    }),

  updateProject: (id, updates) =>
    request(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  deleteProject: (id) =>
    request(`/projects/${id}`, { method: 'DELETE' }),

  applyToProject: (id, message = '') =>
    request(`/projects/${id}/apply`, {
      method: 'POST',
      body: JSON.stringify({ message }),
    }),
};

// ──────────────── ORDERS API ────────────────
export const ordersAPI = {
  getOrders: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/orders?${query}`);
  },

  getOrderById: (id) => request(`/orders/${id}`),

  createOrder: (orderData) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),

  updateOrderStatus: (id, statusData) =>
    request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify(statusData),
    }),

  cancelOrder: (id) =>
    request(`/orders/${id}/cancel`, { method: 'PUT' }),
};

// ──────────────── ATTENDANCE API ────────────────
export const attendanceAPI = {
  getAttendance: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/attendance?${query}`);
  },

  checkIn: (data = {}) =>
    request('/attendance/checkin', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  checkOut: () =>
    request('/attendance/checkout', { method: 'POST' }),

  getSummary: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/attendance/summary?${query}`);
  },
};

// ──────────────── CATALOGUE API ────────────────
export const catalogueAPI = {
  getItems: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/catalogue?${query}`);
  },

  addItem: (itemData) =>
    request('/catalogue', {
      method: 'POST',
      body: JSON.stringify(itemData),
    }),

  updateItem: (id, updates) =>
    request(`/catalogue/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    }),

  deleteItem: (id) =>
    request(`/catalogue/${id}`, { method: 'DELETE' }),
};

// ──────────────── FEED API ────────────────
export const feedAPI = {
  getFeed: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/feed?${query}`);
  },
};

// ──────────────── WORK STATUS API ────────────────
export const workStatusAPI = {
  getWorkStatus: () => request('/work-status'),

  toggleTask: (taskId) =>
    request(`/work-status/tasks/${taskId}`, { method: 'PUT' }),

  getPayments: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/work-status/payments?${query}`);
  },
};

// ──────────────── BANNERS API ────────────────
export const bannersAPI = {
  getBanners: () => request('/banners'),
};

// ──────────────── UPLOAD API ────────────────
export const uploadAPI = {
  uploadImage: async (imageUri) => {
    const formData = new FormData();
    const filename = imageUri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('image', {
      uri: imageUri,
      name: filename,
      type,
    });

    const token = await getToken();

    const response = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Upload failed');
    return data;
  },

  getAuthParams: () => request('/upload/auth'),
};

// ──────────────── SEARCH API ────────────────
export const searchAPI = {
  globalSearch: (q) => request(`/search?q=${encodeURIComponent(q)}`),
};

// ──────────────── SUPPORT API ────────────────
export const supportAPI = {
  createTicket: (subject, message) =>
    request('/support/ticket', {
      method: 'POST',
      body: JSON.stringify({ subject, message }),
    }),

  getTickets: () => request('/support/tickets'),
};

// ──────────────── TOKEN MANAGEMENT ────────────────
export { setToken, removeToken, getToken };

export default {
  authAPI,
  usersAPI,
  projectsAPI,
  ordersAPI,
  attendanceAPI,
  catalogueAPI,
  feedAPI,
  workStatusAPI,
  bannersAPI,
  uploadAPI,
  searchAPI,
  supportAPI,
};
