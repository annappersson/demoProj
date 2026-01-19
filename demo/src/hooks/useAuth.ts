import { useContext } from "react";
import type { AuthContextType } from "../types/authTypes";
import { AuthContext } from "../context/AuthContext";

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;
};