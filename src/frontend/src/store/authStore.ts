import type { UserProfile } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthStore {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  adminToken: string | null;
  setUser: (user: UserProfile | null) => void;
  login: (user: UserProfile) => void;
  logout: () => void;
  setAdmin: (isAdmin: boolean) => void;
  setAdminSession: (token: string) => void;
  clearAdminSession: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      isAdmin: false,
      adminToken: null,

      setUser: (user) => set({ user, isLoggedIn: !!user }),

      login: (user) => set({ user, isLoggedIn: true }),

      logout: () =>
        set({
          user: null,
          isLoggedIn: false,
          isAdmin: false,
          adminToken: null,
        }),

      setAdmin: (isAdmin) => set({ isAdmin }),

      setAdminSession: (token) => set({ isAdmin: true, adminToken: token }),

      clearAdminSession: () => set({ isAdmin: false, adminToken: null }),
    }),
    {
      name: "solura-auth",
      partialize: (state) => ({
        user: state.user,
        isLoggedIn: state.isLoggedIn,
        isAdmin: state.isAdmin,
        adminToken: state.adminToken,
      }),
    },
  ),
);
