import React, { useContext } from 'react'
import './UserAvatarBig.css'

interface Props {
  onClick?: () => void;
}

export const UserAvatarBig = ({onClick}: Props) => {
  return <div className='UserAvatarBig' onClick={onClick}/>
}
