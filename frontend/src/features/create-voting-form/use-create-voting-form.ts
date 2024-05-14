import { useState } from "react";
import { CreateVotingInputs } from "./create-voting-form.config";
import { Voting } from "../../utils/types/votings";
import { useNavigate } from "react-router-dom";
import { VotingsService } from "../../utils/api";
import { isUserAdmin } from "../../utils/helpers/permissions";
import { CreateVotingFormProps } from "./create-voting-form";
import { VotingSystemContract } from "../../smart_contract/services";

const useCreateVotingForm = ({ type }: CreateVotingFormProps) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [votingOptions, setVotingOptions] = useState<string[]>([])
  const navigate = useNavigate()

  const createVoting = async (voting: CreateVotingInputs) => {
    if(!isUserAdmin()) return
    setLoading(true)

    const newVoting:Voting = {
      ...voting,
      options: votingOptions,
      expiration_time: Number(new Date(voting.expiration_time))
    }

    try {
      if (type == 'default') {
        await VotingsService.create(newVoting)
      } else {
        await VotingSystemContract.addVoting(votingOptions, voting.title, voting.content, Number(new Date(voting.expiration_time)))
      }
      navigate('/')

    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    createVoting,
    votingOptions,
    setVotingOptions,
  }
}

export default useCreateVotingForm;