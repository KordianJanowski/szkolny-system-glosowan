import React from 'react'
import { isUserAdmin } from '../../../utils/helpers/permissions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Voting } from '../../../utils/types/votings';
import useVotingCard from './use-voting-card';
import { ConfirmModal } from '..';

export interface Props {
  voting: Voting
  setAllVotings: React.Dispatch<React.SetStateAction<Voting[]>>
  type: 'default' | 'blockchain'
}

const VotingCard: React.FC<Props> = (props: Props) => {
  const { voting, type } = props
  const { isModalOpened, setIsModalOpened, deleteVoting } = useVotingCard(props)

  const route = type === 'default' ? `/voting/${voting.id}` : `/voting-blockchain/${voting.id}`

  return (
    <div className="flex flex-wrap py-8 md:flex-nowrap">
      <div className="flex flex-col justify-between mb-6 md:w-64 md:mb-0">
        <div className='flex flex-col'>
          <span className="font-semibold text-gray-700 title-font">TRWA DO</span>
          <span className="font-semibold text-red-400">{format(new Date(+voting.expiration_time), "dd/MM/yyyy")}</span>
        </div>
        { isUserAdmin() &&
          <div>
            <button className='mr-2' onClick={() => setIsModalOpened(true)}>
              <FontAwesomeIcon icon={faTrashCan} size='lg' />
            </button>
          </div>
        }
      </div>
      <div className="md:flex-grow">
        <h2 className="mb-2 text-2xl font-medium text-gray-900 title-font">{voting.title}</h2>
        <p className="leading-relaxed">{voting.content}</p>
        <Link to={route} className="inline-flex items-center mt-4 font-semibold text-red-500">
          Zagłosuj
          <FontAwesomeIcon className='ml-1' size='sm' icon={faArrowRight} />
        </Link>
      </div>
      { type === 'default' ? (
        <ConfirmModal
          text='Potwierdź usunięcie'
          subtext={`Jesteś pewny(a)? Usunięcie tego głosowania jest trwałe i nieodwracalne!`}
          isModalOpened={isModalOpened}
          setIsModalOpened={setIsModalOpened}
          icon={faTrashCan}
          confirmAction={deleteVoting}
        />
      ) : null }
    </div>
  )
}

export default VotingCard;