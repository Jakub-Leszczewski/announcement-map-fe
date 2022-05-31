import React, { useContext } from 'react'
import './User.css'
import { useDispatch, useSelector } from 'react-redux'
import { openSignInChoice, openUser } from '../../store/slices/app-slice'
import { UserAvatar } from '../UserAvatar/UserAvatar'
import { StoreType } from '../../store'

export const User = () => {
  const userStore = useSelector((store: StoreType) => store.user);
  const dispatch = useDispatch();

  const userLogInHandler = () => {
    dispatch(openSignInChoice(undefined));
  }

  const userAccount = () => {
    dispatch(openUser(undefined));
  }

  return <>
    {
      userStore.user?.id
      ? <UserAvatar onClick={userAccount}/>
      : <p className="User__login-text" onClick={userLogInHandler}>zaloguj się</p>
    }
  </>
}
