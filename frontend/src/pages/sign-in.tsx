import React from 'react';
import { SignInForm } from '../features';
import { checkIfUserLogged } from '../utils/helpers/redirect';

const SignIn: React.FC = () => {
  checkIfUserLogged()

  return (
    <div className='flex items-center justify-center h-screen bg-gray-200'>
      <SignInForm />
    </div>
  )
}

export default SignIn;