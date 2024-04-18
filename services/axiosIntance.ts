import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_BACKEND_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    config.headers.Authorization = `Bearer ${
      localStorage && localStorage.getItem("accessToken")
    }`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(error?.response);
    if (error?.response?.status === 401) {
      window.location.href = "/";
    } else if (error?.response?.status === 403) {
      window.location.href = "/forbidden";
    }
  }
);

export default axiosInstance;
