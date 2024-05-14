import axios from "axios";
import { User, UserLogin } from "../types/user";

const url = `${import.meta.env.VITE_PUBLIC_API_URL}auth/sign-in`;

class AuthService {
  async login(loginDto: UserLogin): Promise<{ user: User; access_token: string }> {
    const { data } = await axios.post(url, loginDto);
    return data;
  }
}

export default new AuthService();
