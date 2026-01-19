import api from "./demoAPI";

export interface LoginResponse {
  access_token: string;
  redirectTo?: string;
}

export async function login(username: string, password: string) {
  const response = await api.post<LoginResponse>("/auth/password", {
    username,
    password,
  });
  localStorage.setItem("access_token", response.data.access_token);

  return response.data;
}
