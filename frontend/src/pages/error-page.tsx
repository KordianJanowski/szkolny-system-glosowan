import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  return (
    <div className='m-5'>
      <h1 className='mb-4 text-4xl'>
        Taka strona nie istnieje!
      </h1>
      <Link to={'/'} className='p-2 text-xl bg-red-400 rounded-md'>
        Powrót na stronę główną
      </Link>
    </div>
  )
}

export default ErrorPage;