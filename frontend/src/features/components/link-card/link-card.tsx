import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Link } from 'react-router-dom';

interface Props {
  text: string
  linkAddress: string
  icon: IconDefinition
}

const LinkCard: React.FC<Props> = ({ text, linkAddress, icon }) => {
  return (
    <Link to={linkAddress} className='flex flex-col items-center justify-center mx-5 duration-150 transform bg-red-400 border border-black rounded-md shadow hover:bg-red-500 h-28 w-72'>
      <FontAwesomeIcon icon={icon} size='2xl' />
      <p className='mt-1 font-semibold'>{text}</p>
    </Link>
  )
}

export default LinkCard;