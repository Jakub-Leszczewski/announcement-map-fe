import React, { useContext } from 'react'
import './SignInChoiceView.css';
import { Button } from '../../components/common/Button/Button';
import { UserMenuHeader } from '../../components/UserMenuHeader/UserMenuHeader'
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
