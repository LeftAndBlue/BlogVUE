import { get, post, delete1, put } from "./request";
import { user } from "@/types/index";
export const loginApi = (data: user) => {
  return post<any>("/api/Login/login", data);
};
export const getUserInfo = (ID: string) => {
  return get<any>("/api/Index/UserInfo", { ID });
};
