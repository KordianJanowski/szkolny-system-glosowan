import { faCheck, faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import useVotingForm from './use-voting-form'
import { useForm } from 'react-hook-form'
import { Voting } from '../../utils/types/votings'

export interface Props {
  voting: Voting
  type: 'default' | 'blockchain'
}

export interface VoteOptionInput {
  option: string
}

const VotingForm: React.FC<Props> = ({ voting, type }) => {
  const { loading, vote } = useVotingForm({ voting, type })

  const { register, handleSubmit, watch } = useForm<VoteOptionInput>();

  return (
    <div>
      <p className='mb-5 text-2xl font-bold'>Wybierz jedną z dostępnych opcji:</p>
      { !loading ? (

      <form onSubmit={handleSubmit(vote)} className='flex flex-col'>
        {
          voting.options.map((option, _index) => {
            return (
              <div key={option} className="inline-flex items-center mb-5">
                <label className="relative flex items-center rounded-full cursor-pointer" htmlFor="check">
                  <input
                    {...register("option")}
                    type="radio"
                    value={_index}
                    className="before:content[''] peer relative h-8 w-8 border-2 cursor-pointer appearance-none rounded-md border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-red-500 checked:bg-red-500 checked:before:bg-red-500 hover:before:opacity-10"
                  />
                  <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                    <FontAwesomeIcon icon={faCheck} size='xl' />
                  </span>
                </label>
                <label className="ml-3 text-xl font-semibold text-gray-700 cursor-pointer select-none" htmlFor="check">
                  {option}
                </label>
              </div>
            )
          })
        }
        <div className="flex items-center justify-between">
          <button type="submit" disabled={watch("option") ? false : true} className={`${watch("option") ? 'bg-red-500 hover:bg-red-400' : 'bg-gray-400 hover:bg-gray-300 cursor-not-allowed'} px-6 py-2 text-lg font-medium tracking-wide text-white transition-colors duration-300 transform rounded-lg focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50`}>
            {
              loading ?
                <div className='flex flex-row items-center justify-center'>
                  <FontAwesomeIcon icon={faCircleNotch} spin />
                  <p className='ml-2 font-semibold'>Ładowanie</p>
                </div>
              :
                "Prześlij głos"
            }
          </button>
        </div>
      </form>
      ) : 'Ładowanie...' }
      </div>
  )
}

export default VotingForm;