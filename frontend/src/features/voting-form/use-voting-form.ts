import { useState } from "react";
import { Props, VoteOptionInput } from "./voting-form";
import { VotesService } from "../../utils/api";
import { Vote } from "../../utils/types/votes";
import { VotingSystemContract } from "../../smart_contract/services";
import Cookies from 'js-cookie'
import { user } from "../../utils/constans/user";

const useVotingForm = ({ voting, type }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const vote = async ({ option }: VoteOptionInput) => {
    setLoading(true)

    if(!voting.id && voting.id !== 0) return

    const vote:Vote = {
      option: +option,
      voting: voting.id
    }


    try {
      if (type === 'default') {
        await VotesService.create(vote)
      } else {
        await VotingSystemContract.addVote(voting.id, +option, "")
      }

      user?.votingsIds.push(voting.id)
      Cookies.set('user', JSON.stringify(user), { expires: 7 })
    } finally {
      setLoading(false)
    }


  }

  return {
    loading,
    vote
  }
}

export default useVotingForm;