import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext.tsx";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
