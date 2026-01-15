import { Navigate } from "react-router";
import { useAuth } from "../../context/AuthContext.tsx";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import type { JSX } from "react";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useAuth();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Du måste logga in för att se denna sidan");
      setShouldRedirect(true);
    }
  }, [isAuthenticated]);

  if (shouldRedirect) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
