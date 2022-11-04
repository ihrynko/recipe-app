import axios from "axios";
import type { AxiosRequestConfig } from "axios";

export const client = axios.create({
  baseURL: "http://localhost:80/api/v1/",
});

client.interceptors.response.use(
  (response) => response.data.data,
  (error) => {
    if (error.message === "Request failed with status code 401") {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

client.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {};
    config.headers.authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
