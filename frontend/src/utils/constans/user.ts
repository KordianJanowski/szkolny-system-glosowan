import Cookies from "js-cookie";
import { User } from "../types/user";

const cookieUser = Cookies.get("user");
export const user = cookieUser ? JSON.parse(cookieUser) as unknown as User : null

export const access_token: string | null = Cookies.get("access_token") ?? null;
export const authHeader =
  access_token ? { headers: { authorization: `Bearer ${access_token}` } }
  : undefined;