import { IResponse } from "@/interfaces/response";
import axiosInstance from "../axiosIntance";
import { IUserProgress } from "@/interfaces/user-progress";
import { returnData } from "../return";

export const getUserProgress = async () => {
  try {
    const { data, status } = await axiosInstance.get(`/user-progress`);
    return returnData<IUserProgress>(data);
  } catch (err) {
    throw err;
  }
};

export const refillHearts = async () => {
  try {
    const { data, status } = await axiosInstance.get(
      "/user-progress/refill-hearts"
    );
    return returnData<string>(data);
  } catch (err) {
    throw err;
  }
};

export const fetch = async () => {
  try {
    await axiosInstance.get(
      "https://qcgateway.zalopay.vn/pay/v2/qr?order=eyJ6cHRyYW5zdG9rZW4iOiJBQ3JEdDlJek90c1Y4a0YyVzA5VTNiY2ciLCJhcHBpZCI6MjU1M30="
    );
  } catch (err) {
    throw err;
  }
};
