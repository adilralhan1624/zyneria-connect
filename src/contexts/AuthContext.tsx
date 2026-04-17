import { createContext, useContext, useState, ReactNode } from "react";

export interface AuthUser {
  name: string;
  email: string;
  isGuest?: boolean;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = async (email: string, password: string) => {
    await wait(700);
    setUser({ name: email.split("@")[0] || "User", email });
  };

  const signup = async (name: string, email: string, password: string) => {
    await wait(800);
    setUser({ name, email });
  };

  const loginAsGuest = () => {
    setUser({ name: "Guest", email: "guest@zyneria.app", isGuest: true });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, signup, loginAsGuest, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
