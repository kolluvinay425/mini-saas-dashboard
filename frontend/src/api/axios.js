import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // Attach JWT token to requests for authenticated API access.
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  },
);

export default api;
