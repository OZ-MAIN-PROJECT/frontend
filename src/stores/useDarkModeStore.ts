// stores/useDarkModeStore.ts
import { create } from "zustand";

interface DarkModeState {
  isDarkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export const useDarkModeStore = create<DarkModeState>((set) => ({
  isDarkMode: false,
  setDarkMode: (value) => {
    document.documentElement.classList.toggle("dark", value);
    localStorage.setItem("darkMode", JSON.stringify(value));
    set({ isDarkMode: value });
  },
}));
