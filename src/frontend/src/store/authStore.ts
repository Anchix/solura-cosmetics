import type { UserProfile } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  setUser: (user: UserProfile | null) => void;
  login: (user: UserProfile) => void;
  logout: () => void;
  setAdmin: (isAdmin: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isAdmin: false,

      setUser: (user) => set({ user, isLoggedIn: !!user }),

      login: (user) => set({ user, isLoggedIn: true }),

      logout: () => set({ user: null, isLoggedIn: false, isAdmin: false }),

      setAdmin: (isAdmin) => set({ isAdmin }),
    }),
    {
      name: "solura-auth",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        isAdmin: state.isAdmin,
      }),
    },
  ),
);
