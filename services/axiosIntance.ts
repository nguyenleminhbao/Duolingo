import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${
      localStorage && localStorage.getItem("access_token")
    }`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosInstance;
