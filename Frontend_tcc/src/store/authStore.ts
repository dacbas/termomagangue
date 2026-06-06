import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Usuario, AuthState } from '../types/index';

interface AuthStore extends AuthState {
  setUsuario: (usuario: Usuario | null) => void;
  setToken: (token: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  login: (usuario: Usuario, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      usuario: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUsuario: (usuario) => set({ usuario }),
      setToken: (token) => set({ token }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),

      login: (usuario, token) => {
        set({
          usuario,
          token,
          isAuthenticated: true,
          error: null,
        });
        localStorage.setItem('token', token);
      },

      logout: () => {
        set({
          usuario: null,
          token: null,
          isAuthenticated: false,
          error: null,
        });
        localStorage.removeItem('token');
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        usuario: state.usuario,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
