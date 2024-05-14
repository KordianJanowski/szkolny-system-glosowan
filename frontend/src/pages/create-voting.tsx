import React from 'react';
import { CreateVotingForm } from '../features';
import { redirectWhenNotAdmin } from '../utils/helpers/redirect';

const CreateVoting: React.FC = () => {
  redirectWhenNotAdmin()

  return (
    <div className='w-2/5 py-10 mx-auto'>
      <h1 className='mb-5 text-3xl font-semibold text-gray-700'>Utwórz głosowanie</h1>
      <CreateVotingForm type='default' />
    </div>
  )
}

export default CreateVoting;