import axios from "axios";

const api_key = "siacontacts";

const authApi = axios.create({
  baseURL: "http://api.alikooshesh.ir:3000",
});

authApi.interceptors.request.use((config) => {
  config.headers.api_key = api_key;
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    const response = await authApi.post("/api/users/login", {
      email,
      password,
    });
    return response.data;
  },
  signup: async (username: string, email: string, password: string) => {
    const response = await authApi.post("/api/users/register", {
      email,
      username,
      password,
    });
    return response.data;
  },
  logout: async () => {
    const response = await authApi.post("/api/users/logout");
    return response.data;
  },
};

const API_KEY = "e0bf214e3b6012037fc7c42d5c34e640";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const weather = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: "metric",
  },
});

export const weatherApi = {
  getWeatherByCity: async (city: string) => {
    console.log("url", `${BASE_URL}/weather?q=${city}&appid=${API_KEY}`);
    const response = await weather.get("/weather", { params: { q: city } });
    return response.data;
  },
  getForecastByCity: async (city: string) => {
    const response = await weather.get("/forecast", { params: { q: city } });
    return response.data;
  },
};
