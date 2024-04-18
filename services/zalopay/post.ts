import { IZALOPAY_ORDER } from "@/interfaces/zalopay";
import axiosInstance from "../axiosIntance";
import { returnData } from "../return";

export const createOrder = async () => {
  try {
    const { data } = await axiosInstance.post("/zalopay/create");
    return returnData<IZALOPAY_ORDER>(data);
  } catch (err) {
    throw err;
  }
};
