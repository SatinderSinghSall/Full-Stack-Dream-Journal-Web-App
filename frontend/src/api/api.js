import axios from "axios";

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Attach JWT to all requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 🧍 User endpoints
export const getUserProfile = () => api.get("/user/profile");
export const updateUserProfile = (data) => api.put("/user/profile", data);
export const deleteFriend = (id) => api.delete(`/friends/${id}`);

// 🧑‍🤝‍🧑 Friend system endpoints
export const getFriends = () => api.get("/friends");
export const getRequests = () => api.get("/friends/requests");
export const getSent = () => api.get("/friends/sent");

export const sendRequest = (id) => api.post(`/friends/request/${id}`);
export const acceptRequest = (id) => api.post(`/friends/accept/${id}`);
export const rejectRequest = (id) => api.post(`/friends/reject/${id}`);
export const cancelRequest = (id) => api.post(`/friends/cancel/${id}`);

export const getFriendProgress = (id) => api.get(`/friends/progress/${id}`);
export const findUserByEmail = (email) =>
  api.get(`/user/findByEmail/${encodeURIComponent(email)}`);

// 🔍 User search endpoint
export const searchUsers = (query) =>
  api.get(`/friends/search?q=${encodeURIComponent(query)}`);

// 🌟 Dream Endpoint
export const getDreams = () => api.get("/dreams");

export default api;
