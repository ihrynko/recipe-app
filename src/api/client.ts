import axios from "axios";

export const client= axios.create({
  baseURL: "http://localhost:80/api/v1/",
});

client.interceptors.response.use(
  (response) => response.data.data,
  (error) => Promise.reject(error)
);