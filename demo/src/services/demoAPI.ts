import axios from "axios";

export interface CitiesResponse {
  cities: {
    guid: string;
    name: string;
  };
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token") || ""}`,
  },
});

const get = async <T>(endpoint: string) => {
  const res = await api.get<T>(endpoint);

  return res.data;
};

export const getCities = () => {
  return get<CitiesResponse>(`/cities`);
};

export default api;
