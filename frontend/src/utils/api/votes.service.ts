import axios from "axios";
import { Iresponse } from "../types/api";
import { authHeader } from "../constans/user";
import { Vote } from "../types/votes";

const url = `${import.meta.env.VITE_PUBLIC_API_URL}votes`;

class VotesService {
  async create(vote: Vote): Promise<Vote> {
    const { data }: Iresponse<Vote> = await axios.post(url, vote, authHeader);
    return data;
  }
}

export default new VotesService();
