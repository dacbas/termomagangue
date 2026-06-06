import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const {
    usuario,
    token,
    isAuthenticated,
    isLoading,
    error,
    setUsuario,
    setToken,
    setIsLoading,
    setError,
    login,
    logout,
  } = useAuthStore();

  return {
    usuario,
    token,
    isAuthenticated,
    isLoading,
    error,
    setUsuario,
    setToken,
    setIsLoading,
    setError,
    login,
    logout,
  };
};
