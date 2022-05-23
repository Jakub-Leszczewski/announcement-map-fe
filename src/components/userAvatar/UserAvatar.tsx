import React, { useContext } from 'react'
import './style.css'
import { useDispatch } from 'react-redux'
import { AuthContext } from '../auth/Auth'
import { openSignInChoice, openUser } from '../../store/slices/app-slice'

export const UserAvatar = () => {
  const context = useContext(AuthContext);
  const dispatch = useDispatch();

  const userLogInHandler = () => {
    dispatch(openSignInChoice(undefined as never));
  }

  const userAccount = () => {
    dispatch(openUser(undefined as never));
  }

  return <>
    {
      context.id
      ? <div className='UserAvatar__avatar' onClick={userAccount}/>
      : <p className="UserAvatar__login-text" onClick={userLogInHandler}>zaloguj się</p>
    }
  </>
}
