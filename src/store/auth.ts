import { create } from 'zustand';
import { api } from '../api/client';
import type { AuthResponse, UserProfile } from '../types';

type AuthState = {
  token: string | null;
  user: UserProfile | null;
  login: (q: { alias?: string; email?: string; password: string }) => Promise<void>;
  fetchMe: () => Promise<void>;
  logout: () => void;
};

export const useAuth = create<AuthState>((set) => ({
  token: localStorage.getItem('token'),
  user: null,

  async login(q) {
  console.log('Call back');
  const { data } = await api.post<AuthResponse>('/auth/login', q);
    localStorage.setItem('token', data.access_token);
    set({ token: data.access_token });
    await (useAuth.getState().fetchMe());
  },

  async fetchMe() {
    const { data } = await api.get<UserProfile>('/auth/me');
    set({ user: data });
  },

  logout() {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },
}));
