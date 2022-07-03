import React from 'react'
import './User.css'
import { useDispatch } from 'react-redux'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import { useIsAuth } from '../../hooks/useIsAuth'
import { openSignInChoice, openUser } from '../../store/slices/app-slice'

export const User = () => {
  const dispatch = useDispatch();
  const isAuth = useIsAuth();

  const userLogInHandler = () => {
    dispatch(openSignInChoice());
  }

  const userAccount = () => {
    dispatch(openUser());
  }

  return <>
    {
      isAuth
      ? <UserAvatar onClick={userAccount}/>
      : <p className="User__login-text" onClick={userLogInHandler}>zaloguj się</p>
    }
  </>
}
