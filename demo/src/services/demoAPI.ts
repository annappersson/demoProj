import axios from "axios";

export interface CitiesResponse {
  cities: [
    {
      guid: string;
      name: string;
    }
  ];
}

export interface CityResponse {
  Id: number;
  guid: string;
  name: string;
  movie: string;
  deleted: boolean;
}

export interface CityDetailResponse {
  errorsException: boolean;
  resultText: string;
  city: CityResponse;
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

export const getCity = async (guid: string) => {
  return get<CityDetailResponse>(`/cities/${guid}`);
};

export const updateCity = async (guid: string, movie: string, name: string) => {
  const res = await api.patch(`/cities/${guid}`, { movie, name });
  return res.data;
};

export const deleteCity = async (guid: string) => {
  const res = await api.delete(`/cities/${guid}`);
  return res.data;
};

export default api;
