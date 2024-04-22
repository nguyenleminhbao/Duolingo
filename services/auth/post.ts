import { IUser } from "@/interfaces/user";

import { returnData } from "../return";
import axiosInstance from "../axiosIntance";

export const login = async (userId: string) => {
  try {
    const { data, status } = await axiosInstance.post("/auth/login", {
      userId,
    });
    return returnData<IUser>(data);
  } catch (err) {
    throw err;
  }
};

export const refreshTokenFunc = async(refreshToken: string)=>{
  try{
    const {data, status} = await axiosInstance.post("/auth/refresh-token", {
      refreshToken
    })
    return returnData<{
      accessToken: string,
      refreshToken: string
    }>(data)
  }
  catch(err){
    throw err;
  }
}

