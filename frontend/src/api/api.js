import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// ✅ Attach JWT to all requests
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

export default api;
