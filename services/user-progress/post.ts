import { IUserProgress } from "@/interfaces/user-progress";
import axiosInstance from "../axiosIntance";
import { returnData } from "../return";

type UpdateUserProgress = {
  active_course_id: number;
  hearts?: number;
  points?: number;
};

export const updateUserProgress = async (updateData: UpdateUserProgress) => {
  try {
    const { data, status } = await axiosInstance.post(
      "/user-progress/update",
      updateData
    );
    return returnData<IUserProgress>(data);
  } catch (err) {
    throw err;
  }
};

export const reduceHearts = async (challenge_id: number) => {
  try {
    const { data, status } = await axiosInstance.post(
      "/user-progress/reduce-hearts",
      challenge_id
    );
    return returnData<string>(data);
  } catch (err) {
    throw err;
  }
};
