import React, { useContext } from 'react'
import './User.css'
import { useDispatch } from 'react-redux'
import { AuthContext } from '../Auth/Auth'
import { openSignInChoice, openUser } from '../../store/slices/app-slice'
import { UserAvatar } from '../UserAvatar/UserAvatar'

export const User = () => {
  const context = useContext(AuthContext);
  const dispatch = useDispatch();

  const userLogInHandler = () => {
    dispatch(openSignInChoice(undefined));
  }

  const userAccount = () => {
    dispatch(openUser(undefined));
  }

  return <>
    {
      context.id
      ? <UserAvatar onClick={userAccount}/>
      : <p className="User__login-text" onClick={userLogInHandler}>zaloguj się</p>
    }
  </>
}
