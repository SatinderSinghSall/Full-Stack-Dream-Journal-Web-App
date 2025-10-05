import axios from "axios";

// console.log("API URL:", process.env.REACT_APP_API_URL);

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getUserProfile = () => api.get("/user/profile");
export const updateUserProfile = (data) => api.put("/user/profile", data);

export default api;
