import { IUnit } from "@/interfaces/courses";
import axiosInstance from "../axiosIntance";
import { returnData } from "../return";

export const getUnits = async () => {
  try {
    const { data, status } = await axiosInstance.get("/units");
    return returnData<IUnit[]>(data);
  } catch (err) {
    throw err;
  }
};
