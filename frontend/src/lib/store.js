import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from './api';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token, isAuthenticated: !!token }),

      login: async (email, password) => {
        set({ isLoading: true });
        try {
          const { data } = await api.post('/auth/login', { email, password });
          set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
          return data;
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },

      register: async (userData) => {
        set({ isLoading: true });
        try {
          console.log('🔐 Sending registration request to:', api.defaults.baseURL + '/auth/register');
          console.log('📦 Payload:', userData);
          const { data } = await api.post('/auth/register', userData);
          console.log('✨ Server response:', data);
          set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
          return data;
        } catch (error) {
          console.error('🚨 API Error details:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            config: error.config
          });
          set({ isLoading: false });
          throw error;
        }
      },

      loadFromStorage: () => {}, // Handled by persist

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
      }
    }),
    {
      name: 'fitpulse-auth',
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);
