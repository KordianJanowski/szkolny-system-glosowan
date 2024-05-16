import React, { useEffect } from 'react';
import { SignInForm } from '../features';
import { checkIfUserLogged } from '../utils/helpers/redirect';
import { VotingsService } from '../utils/api';

const SignIn: React.FC = () => {
  checkIfUserLogged()

  const getVotings = async () => {
    const votings =  await VotingsService.findAll()

    if(!votings) return
    console.log(votings)
  }

  useEffect(() => {
    getVotings()
  }, []);

  return (
    <div className='flex items-center justify-center h-screen bg-gray-200'>
      <SignInForm />
    </div>
  )
}

export default SignIn;