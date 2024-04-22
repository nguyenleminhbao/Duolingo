
import axios from "axios";
import {  refreshTokenFunc } from "./auth/post";

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
  async(response) =>{
    return response
  } ,
  async(error) => {
    if (error?.response?.status == 401) {
      const config = error?.response?.config;
      const token = localStorage && localStorage?.getItem("refreshToken");

      const  data = await refreshTokenFunc(token as string);
      if (data) {
        localStorage.setItem("accessToken", data?.accessToken as string);
        localStorage.setItem("refreshToken", data?.refreshToken as string);
        config.headers.Authorization = `Bearer ${
          localStorage && localStorage.getItem("accessToken")
        }`;
        return axiosInstance(config);
      }
     }
    else if (error?.response?.status === 403) {
      window.location.href = "/forbidden";
    }
  }
);

export default axiosInstance;
