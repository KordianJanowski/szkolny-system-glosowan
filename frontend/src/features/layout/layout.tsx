import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '..';
import { checkIfUserNotLogged } from '../../utils/helpers/redirect';

const Layout: React.FC = () => {
  checkIfUserNotLogged()

  return (
    <div className='min-h-screen text-gray-800 bg-gray-50'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout;