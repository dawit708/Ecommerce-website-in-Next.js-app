import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  hydrated: boolean;
  setHydrated: () => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      hydrated: false,

      setHydrated: () => set({ hydrated: true }),

      login: (email, name) =>
        set({
          user: {
            email,
            name: name || email.split("@")[0],
          },
        }),

      logout: () => set({ user: null }),
    }),
    {
      name: "novacart-auth",
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);