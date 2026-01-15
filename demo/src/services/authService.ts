import api from "./demoAPI";

export interface LoginResponse {
    access_token: string;
}

export async function login(username: string, password: string) {
    const response = await api.post<LoginResponse>("/auth/password", {
        username,
        password,
    });

    return response.data;
}
