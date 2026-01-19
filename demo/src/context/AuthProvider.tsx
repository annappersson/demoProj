import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { decodeAndMapUser } from "../utils/jwt";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("access_token")
  );

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(decodeAndMapUser(token));
  }, [token]);

  const login = (jwt: string) => {
    localStorage.setItem("access_token", jwt);
    setToken(jwt);
  };

  const logout = () => {
    localStorage.setItem("access_token", "");
    setToken("");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
