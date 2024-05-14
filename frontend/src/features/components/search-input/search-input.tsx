import React from 'react';
import { useForm } from 'react-hook-form';
import useSeachInput from './use-search-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Voting } from '../../../utils/types/votings';

export interface Props {
  allVotings: Voting[]
  setVotings: React.Dispatch<React.SetStateAction<Voting[]>>
}

export interface SearchInput {
  phrase: string
}

const SearchInput: React.FC<Props> = (props) => {
  const { search } = useSeachInput(props)

  const {
    register,
    handleSubmit,
  } = useForm<SearchInput>()

  return (
    <form onSubmit={handleSubmit(search)}>
      <div className="relative block w-full overflow-hidden text-lg text-gray-700 bg-white rounded-lg">
        <input {...register("phrase")} className='w-full pr-12 h-full px-5 py-2.5 border border-gray-200 rounded-lg shadow outline-none placeholder-gray-400/70 focus:border-red-400 focus:outline-none' type="text" placeholder="Wyszukaj głosowanie" />
        <FontAwesomeIcon className='absolute right-5 top-3.5 text-gray-300' icon={faSearch} />
      </div>
    </form>
  )
}

export default SearchInput;