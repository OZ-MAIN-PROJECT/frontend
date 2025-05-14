import { SimpleUser } from '@/types/auth';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  access_token: string | null;
  refresh_token : string | null;
  user: SimpleUser | null;
  setAuth: (token: string, refresh : string, user: SimpleUser) => void;
  setLogout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      access_token: null,
      refresh_token: null,
      user: null,
      setAuth: (access, refresh, user) => {
        set({ access_token: access, refresh_token : refresh, user });
        const payload = JSON.parse(atob(access.split('.')[1]));
        console.log(payload);
      },
      setLogout: () => {
        set({ access_token: null, refresh_token: null, user: null })
        console.log('로그아웃 요청')
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        access_token: state.access_token, 
        refresh_token : state.refresh_token,
        user: state.user 
      }),
    }
  )
);
