import React, { useContext } from 'react'
import './User.css'
import { useDispatch, useSelector } from 'react-redux'
import { openSignInChoice, openUser } from '../../store/slices/app-slice'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import { StoreType } from '../../store'
import { useIsAuth } from '../../hooks/useIsAuth'

export const User = () => {
  const dispatch = useDispatch();
  const isAuth = useIsAuth();

  const userLogInHandler = () => {
    dispatch(openSignInChoice(undefined));
  }

  const userAccount = () => {
    dispatch(openUser(undefined));
  }

  return <>
    {
      isAuth
      ? <UserAvatar onClick={userAccount}/>
      : <p className="User__login-text" onClick={userLogInHandler}>zaloguj się</p>
    }
  </>
}
