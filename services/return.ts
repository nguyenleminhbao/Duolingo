import { IResponse } from "@/interfaces/response";

export function returnData<T>(data: any) {
  const response = data as IResponse<T>;
  if (response.type == "Success") return response.message;
  //return null;
}
