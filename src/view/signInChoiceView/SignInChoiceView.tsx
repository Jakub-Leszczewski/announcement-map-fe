import React, { useContext } from 'react'
import './style.css';
import { Button } from '../../components/common/button/Button';
import { UserMenuHeader } from '../../components/common/userMenuHeader/UserMenuHeader'
import { useDispatch } from 'react-redux'
import { openNone, openSignIn, openSignup } from '../../store/slices/app-slice'

export const SignInChoiceView = () => {
  const dispatch = useDispatch();

  const goBackHandler = () => {
    dispatch(openNone(undefined));
  }

  const goSignInHandler = () => {
    dispatch(openSignIn(undefined));
  }

  const goSignupHandler = () => {
    dispatch(openSignup(undefined));
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
