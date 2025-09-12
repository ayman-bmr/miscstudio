import { QueryClient } from '@tanstack/react-query';
import jwt from 'jsonwebtoken';

const TOKEN_KEY = 'auth_token';
const GUEST_KEY = 'isGuest';
const CURRENT_USER = 'current_user';
const PASSWORD_RESET_TOKEN = 'password_reset_token';

const authHelpers = {
  setAuthToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },
  getAuthToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },
  removeAuthToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(TOKEN_KEY);
    }
  },
  setUser: (user: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER, JSON.stringify(user));
    }
  },
  getUser: () => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem(CURRENT_USER)
      return !!user ? JSON.parse(user) : null;
    }
    return null;
  },
  removeUser: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(CURRENT_USER);
    }
  },
  isGuest: () => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem(GUEST_KEY);
    }
    return null;
  },
  removeIsGuest: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(GUEST_KEY);
    }
  },
  clearAuth: () => {
    authHelpers.removeAuthToken();
    authHelpers.removeUser();
    authHelpers.removeIsGuest();
  },
  isAuthenticated: () => {
    const token = authHelpers.getAuthToken();
    const isGuest = authHelpers.isGuest()
    return !isTokenInvalid(token) || !!isGuest;
  },
  handleLogout: ({
    isGuest,
    deleteGuestUser,
    push,
    queryClient
  }: {
    isGuest: boolean;
    deleteGuestUser: Function;
    push: Function;
    queryClient: QueryClient;
  }) => {
    if (isGuest) {
      deleteGuestUser();
    } else {
      queryClient.removeQueries();
      authHelpers.clearAuth();
      push("/welcome");
    }
  }
};

export default authHelpers;

export function isTokenInvalid(token: any): boolean {
  try {
      const decoded: any = jwt.decode(token);
      if (!decoded || !decoded.exp) {
          return true;
      }

      const currentTime = Math.floor(Date.now() / 1000);
      return decoded.exp < currentTime;
  } catch (error) {
      return true;
  }
}