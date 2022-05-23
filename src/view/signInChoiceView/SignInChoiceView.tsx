import React, { useContext } from 'react'
import './style.css';
import { Button } from '../../components/common/button/Button';
import { ArrowButton } from '../../components/common/arrowButton/ArrowButton'
import { UserMenuHeader } from '../../components/common/userMenuHeader/UserMenuHeader'
import { AuthContext } from '../../components/auth/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { ActionType, openNone, openSignIn, openSignInChoice, openSignup } from '../../store/slices/app-slice'
import { StoreType } from '../../store'

export const SignInChoiceView = () => {
  const dispatch = useDispatch();

  const goBackHandler = () => {
    dispatch(openNone(undefined as never));
  }

  const goSignInHandler = () => {
    dispatch(openSignIn(undefined as never));
  }

  const goSignupHandler = () => {
    dispatch(openSignup(undefined as never));
  }

  return(
    <section className="SignInChoice">
      <UserMenuHeader title="Logowanie" onClick={goBackHandler}/>

      <div className="SignInChoice__buttons-container">
        <Button width="100%" height={30} borderRadius="15px" onClick={goSignInHandler}>Zaloguj się</Button>
        <Button width="100%" height={30} borderRadius="15px" onClick={goSignupHandler}>Zarejestruj się</Button>
      </div>
    </section>
  );
}
