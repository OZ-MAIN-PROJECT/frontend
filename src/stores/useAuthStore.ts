import { SimpleUser } from '@/types/auth';
import { create } from 'zustand';
interface AuthState {
  token: string | null;
  user: SimpleUser | null;
  setAuth: (token: string, user: SimpleUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  token: null,
  user: null,
  setAuth: (token, user) => set({ token, user }),
  logout: () => set({ token: null, user: null }),
}));
