import React, { useContext } from 'react'
import './UserAvatar.css'

interface Props {
  onClick?: () => void;
}

export const UserAvatar = ({onClick}: Props) => {
  return <div className='UserAvatar__avatar' onClick={onClick}/>
}
