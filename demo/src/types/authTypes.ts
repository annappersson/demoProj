export interface UserInfo {
  email: string;
  name: string;
  phone: string;
  personalNumber: string;
  startpage: string;
  raw?: any;
}

export type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  user: UserInfo | null;
};

export interface MyJwtPayload {
  email: string;
  name: string;
  phone: string;
  personalNumber: string;
  startpage: string;
  exp: number;
  sub: string;
}
