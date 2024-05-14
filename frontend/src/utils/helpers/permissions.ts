import { user } from "../constans/user";

export const isUserAdmin = () => {
  return user?.roles.includes('admin')
}