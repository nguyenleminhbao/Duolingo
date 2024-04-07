export interface IResponse<T> {
  type: "Success" | "Error";
  code: number;
  message: T;
}
