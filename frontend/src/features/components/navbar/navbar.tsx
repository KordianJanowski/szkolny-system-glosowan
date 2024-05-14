import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckToSlot, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import useNavbar from './use-navbar';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const { logout } = useNavbar()

  return (
    <header className="text-gray-600 border-b body-font bg-gray-50">
      <div className="container flex flex-col flex-wrap items-center p-5 mx-auto md:flex-row">
        <Link to={'/'} className="flex items-center mb-4 font-medium text-gray-900 title-font md:mb-0">
          <div className="flex items-center justify-center w-10 h-10 p-2 text-white bg-red-500 rounded-full">
            <FontAwesomeIcon icon={faCheckToSlot} size='lg' />
          </div>
          <span className="ml-3 text-xl">Szkolny system głosowań</span>
        </Link>
        <nav className="flex flex-wrap items-center justify-center text-base md:ml-auto">
          {/* <a className="mr-5 hover:text-gray-900">First Link</a> */}
        </nav>
        <button onClick={logout} className="inline-flex items-center px-3 py-1 mt-4 text-base bg-gray-100 border rounded focus:outline-none hover:bg-gray-200 md:mt-0">
          <span className='mr-2'>Wyloguj się</span>
          <FontAwesomeIcon icon={faRightFromBracket} />
        </button>
      </div>
    </header>
  )
}

export default Navbar;