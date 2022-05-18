import React from 'react'
import './style.css'

export const UserAvatar = () => {
  const isLogin = true;

  return <>
    {
      isLogin
      ? <div className='UserAvatar__avatar'></div>
      : <p className="UserAvatar__login-text">zaloguj się</p>
    }
  </>
}
