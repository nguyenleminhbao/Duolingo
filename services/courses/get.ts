import { ICourse } from "@/interfaces/courses";
import axiosInstance from "../axiosIntance";
import { IResponse } from "@/interfaces/response";

export const getAllCourses = async () => {
  try {
    const { data, status } = await axiosInstance.get("/courses");
    const response = data as IResponse<ICourse[]>;
    if ((response.type = "Success")) return response.message;
    return null;
  } catch (err) {
    throw err;
  }
};
