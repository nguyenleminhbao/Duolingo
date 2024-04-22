import axiosInstance from "../axiosIntance";
import { returnData } from "../return";

export const logout = async()=>{
    try{
      const {data, status} = await axiosInstance.delete("/auth/logout");
      return returnData<string>(data)
    }
    catch(err){
      throw err;
    }
  }
  