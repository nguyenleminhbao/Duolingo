import { ILesson } from "@/interfaces/courses";
import axiosInstance from "../axiosIntance";
import { returnData } from "../return";

export const getLessons = async (lesson_id?: number) => {
  try {
    const { data, status } = await axiosInstance.post("/courses/get-lessons", {
      lesson_id,
    });
    return returnData<ILesson>(data);
  } catch (err) {
    throw err;
  }
};
