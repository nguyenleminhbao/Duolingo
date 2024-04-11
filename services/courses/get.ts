import { ICourse, ICourseProgress } from "@/interfaces/courses";
import axiosInstance from "../axiosIntance";
import { returnData } from "../return";

export const getAllCourses = async () => {
  try {
    const { data, status } = await axiosInstance.get("/courses");
    return returnData<ICourse[]>(data);
  } catch (err) {
    throw err;
  }
};

export const getCourseById = async (course_id: number) => {
  try {
    const { data, status } = await axiosInstance.get(`/courses/${course_id}`);
    return returnData<ICourse>(data);
  } catch (err) {
    throw err;
  }
};

export const getCourseProgress = async () => {
  try {
    const { data, status } = await axiosInstance.get("/courses/progress");
    return returnData<ICourseProgress>(data);
  } catch (err) {
    throw err;
  }
};

export const getLessonPercentage = async () => {
  try {
    const { data, status } = await axiosInstance.get(
      "/courses/get-lesson-percentage"
    );
    return returnData<number>(data);
  } catch (err) {
    throw err;
  }
};
