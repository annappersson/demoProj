import axios from "axios";

export interface CitiesResponse {
  cities: [
    {
      guid: string;
      name: string;
    }
  ];
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const get = async <T>(endpoint: string) => {
  const res = await api.get<T>(endpoint);

  return res.data;
};

export const getCities = async () => {
  return get<CitiesResponse>(`/cities`);
};

export default api;
