import { useState } from "react";
import { VotingsService } from "../../../utils/api";
import { Props } from "./voting-card";

const useVotingCard = ({ voting, setAllVotings }: Props) => {
  const [isModalOpened, setIsModalOpened] = useState<boolean>(false)

  const deleteVoting = async () => {
    if(!voting.id) return
    await VotingsService.remove(voting.id.toString())
    setAllVotings(votings => votings.filter(votingEl => votingEl.id !== voting.id))
  }

  return {
    isModalOpened,
    setIsModalOpened,
    deleteVoting
  }
}

export default useVotingCard;