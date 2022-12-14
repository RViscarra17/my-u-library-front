import axios from "axios";
import history from "./history";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 10000,
  headers: {
    accept: "application/json",
  },
});

httpClient.interceptors.request.use(function (config) {
  const token = localStorage.getItem("token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  config.headers.Accept = 'application/json';
  return config;
});

httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    if (error.response?.status === 403) {
      history.replace("/forbidden");
      return Promise.reject(error);
    }
    if (error.response?.status === 401) {
      history.replace("/login");
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default httpClient;
