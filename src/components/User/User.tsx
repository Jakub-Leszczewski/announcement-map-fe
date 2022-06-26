import React from 'react'
import './User.css'
import { useDispatch } from 'react-redux'
import { openWindow, Window } from '../../store/slices/app-slice'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import { useIsAuth } from '../../hooks/useIsAuth'

export const User = () => {
  const dispatch = useDispatch();
  const isAuth = useIsAuth();

  const userLogInHandler = () => {
    dispatch(openWindow({
      openWindow: Window.OPEN_SIGN_IN_CHOICE,
      data: undefined,
    }));
  }

  const userAccount = () => {
    dispatch(openWindow({
      openWindow: Window.OPEN_USER,
      data: undefined,
    }));
  }

  return <>
    {
      isAuth
      ? <UserAvatar onClick={userAccount}/>
      : <p className="User__login-text" onClick={userLogInHandler}>zaloguj się</p>
    }
  </>
}
