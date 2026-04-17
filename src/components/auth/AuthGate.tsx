import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AuthOverlay from "./AuthOverlay";

export const AuthGate = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {children}
      {!isAuthenticated && <AuthOverlay />}
    </>
  );
};

export default AuthGate;
