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
