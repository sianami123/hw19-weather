import axios from "axios";

const api_key = "siacontacts";

const api = axios.create({
  baseURL: "http://api.alikooshesh.ir:3000",
});

api.interceptors.request.use((config) => {
  config.headers.api_key = `Bearer ${api_key}`;
  return config;
});

export const auth = {
  login: async (username: string, password: string) => {
    const response = await api.post("/api/users/login", { username, password });
    return response.data;
  },
  signup: async (username: string, email: string, password: string) => {
    const response = await api.post("/api/users/register", {
      username,
      email,
      password,
    });
    return response.data;
  },
  logout: async () => {
    const response = await api.post("/api/users/logout");
    return response.data;
  },
};
