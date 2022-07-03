import React from 'react'
import './SignInChoiceView.css';
import { Button } from '../../components/common/Button/Button';
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
import { useDispatch } from 'react-redux'
import { openNone, openSignIn, openSignup } from '../../store/slices/app-slice'

export const SignInChoiceView = () => {
  const dispatch = useDispatch();

  const goBackHandler = () => {
    dispatch(openNone());
  }

  const goSignInHandler = () => {
    dispatch(openSignIn(null));
  }

  const goSignupHandler = () => {
    dispatch(openSignup());
  }

  return(
    <section className="SignInChoiceView">
      <UserMenuHeader title="Logowanie" onClick={goBackHandler}/>

      <nav className="SignInChoiceView__buttons-container">
        <Button onClick={goSignInHandler}>Zaloguj się</Button>
        <Button onClick={goSignupHandler}>Zarejestruj się</Button>
      </nav>
    </section>
  );
}
