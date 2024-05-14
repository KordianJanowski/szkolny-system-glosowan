import axios from "axios";
import { Voting } from "../types/votings";
import { Iresponse } from "../types/api";
import { authHeader } from "../constans/user";

const url = `${import.meta.env.VITE_PUBLIC_API_URL}votings`;


class VotingsService {
  async create(voting: Voting): Promise<Voting> {
    const { data }: Iresponse<Voting> = await axios.post(url, voting, authHeader);
    return data;
  }

  async findAll(cache: RequestCache = "no-store"): Promise<Voting[]> {
    const data = await fetch(url, { cache });
    return await data.json();
  }

  async findOne(id: string, cache: RequestCache = "no-store"): Promise<Voting> {
    const data = await fetch(`${url}/${id}`, { cache });
    return await data.json();
  }

  async remove(id: string): Promise<Voting> {
    const { data }: Iresponse<Voting> = await axios.delete(`${url}/${id}`, authHeader);
    return data;
  }
}

export default new VotingsService();
